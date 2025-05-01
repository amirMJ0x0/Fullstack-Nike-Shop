import { createContext, useContext, useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "./AuthProvider";
import {
  addProductToLocalCart,
  clearCartFromLocalStorage,
  getCartFromLocalStorage,
  removeProductFromLocalCart,
} from "../utils/cartHelpers";

const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const totalItems =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  //fetch cart data from server or localStorage
  const fetchCart = async () => {
    try {
      setLoading(true);
      if (user) {
        const response = await api.get("/cart");
        const localCart = getCartFromLocalStorage();

        if (localCart?.items?.length) {
          const mergedCart = await mergeLocalCartWithServer(localCart);
          setCart(mergedCart);
          clearCartFromLocalStorage();
        } else {
          setCart(response.data.cart);
        }
      } else {
        const tempCart = getCartFromLocalStorage();
        setCart(tempCart);
      }
    } catch (error) {
      console.error("Error fetching cart:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Merge local cart with server cart
  const mergeLocalCartWithServer = async (localCart) => {
    try {
      const response = await api.post("/cart/merge", {
        items: localCart.items,
      });
      return response.data.cart;
    } catch (error) {
      console.error("Error merging cart:", error.message);
      return null;
    }
  };

  //add item to cart
  const addToCart = async (productId, quantity = 1, color, size) => {
    try {
      if (user) {
        const response = await api.post("/cart/add", {
          productId,
          quantity,
          color,
          size,
        });
        setCart(response.data.cart);
      } else {
        const updatedCart = addProductToLocalCart(
          productId,
          quantity,
          color,
          size
        );
        setCart(updatedCart);
      }
    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
  };

  //delete item of cart
  const removeFromCart = async (productId) => {
    try {
      if (user) {
        const response = await api.delete("/remove", {
          data: { productId },
        });
        console.log(response.data);
        setCart(response.data.cart);
      } else {
        const updatedCart = removeProductFromLocalCart(productId);
        setCart(updatedCart);
      }
    } catch (error) {
      console.error("Error removing from cart:", error.message);
    }
  };

  const reduceQuantity = async (productId, color, size) => {
    try {
      await api.post("/cart/reduce", {
        productId,
        color,
        size,
      });
      fetchCart();
    } catch (error) {
      console.error("Error reducing quantity:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);
  return (
    <CartContext.Provider
      value={{
        loading,
        cart,
        addToCart,
        removeFromCart,
        reduceQuantity,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
