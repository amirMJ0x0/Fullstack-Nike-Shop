import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthProvider";
import {
  addProductToLocalCart,
  clearCartFromLocalStorage,
  getCartFromLocalStorage,
  removeProductFromLocalCart,
  reduceQuantityFromLocalCart,
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
  const addToCart = async (productId, color, size, quantity = 1) => {
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
          color,
          size,
          quantity
        );
        setCart(updatedCart);
      }
    } catch (error) {
      console.error("Error adding to cart:", error.message);
      console.log(error);
    }
  };

  //delete item of cart
  const removeFromCart = async (productId) => {
    try {
      if (user) {
        const response = await api.delete("/cart/remove", {
          data: { productId },
        });
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
      if (user) {
        await api.post("/cart/reduce", {
          productId,
          color,
          size,
        });
        fetchCart();
      } else {
        const updatedCart = reduceQuantityFromLocalCart(productId, color, size);
        setCart(updatedCart);
      }
    } catch (error) {
      console.error("Error reducing quantity:", error);
    }
  };

  // Cart calculations (for use in CartPage, CheckoutPage, etc.)
  const products = cart?.items || [];
  const subtotal = products.reduce(
    (acc, item) => acc + (item.productId?.price || 0) * item.quantity,
    0
  );
  const totalDiscount = products.reduce(
    (acc, item) =>
      acc +
      (((item.productId?.price || 0) * (item.productId?.discount || 0)) / 100) *
        item.quantity,
    0
  );
  const taxAmount = 2;
  const tax = subtotal * (taxAmount / 100);
  const total = subtotal - totalDiscount + tax;

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
        subtotal,
        totalDiscount,
        tax,
        total,
        taxAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
