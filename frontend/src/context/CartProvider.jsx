import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthProvider";
import {
  addProductToLocalCart,
  clearCartFromLocalStorage,
  getCartFromLocalStorage,
  removeProductFromLocalCart,
  reduceQuantityFromLocalCart,
} from "../utils/cartHelpers";
import { useToast } from "@chakra-ui/react";
import { delay } from "../utils/delay";

const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const toast = useToast();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const { user } = useAuth();

  const totalItems =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  //fetch cart data from server or localStorage
  const fetchCart = async () => {
    try {
      setLoading(true);

      const shouldForceClear = localStorage.getItem("forceClearCart");

      if (shouldForceClear === "true") {
        clearCartFromLocalStorage();
        localStorage.removeItem("forceClearCart");
        setCart({ items: [] });
        return;
      }

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
      setInitialLoading(false);
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
        const { data } = await api.post("/cart/add", {
          productId,
          quantity,
          color,
          size,
        });
        setCart(data.cart);
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
        const { data } = await api.post("/cart/reduce", {
          productId,
          color,
          size,
        });
        setCart(data.cart || { items: [] });
      } else {
        const updatedCart = reduceQuantityFromLocalCart(productId, color, size);
        setCart(updatedCart);
      }
    } catch (error) {
      console.error("Error reducing quantity:", error);
    }
  };
  const clearCart = async (retryCount = 0) => {
    try {
      if (!user?._id) {
        if (retryCount < 3) {
          console.warn("User not ready, retrying clearCart...");
          await delay(500);
          return clearCart(retryCount + 1);
        } else {
          clearCartFromLocalStorage();
          localStorage.setItem("forceClearCart", "true");
          setCart({ items: [] });
          console.error("User still not available after retries.");
        }
        return;
      }

      const res = await api.delete("/cart");

      setCart(res.data.cart || { items: [] });
    } catch (error) {
      console.error("🔥 Error clearing cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const { subtotal, totalDiscount, tax, total, taxRate } = useMemo(() => {
    const items = cart?.items || [];
    const rate = 2;
    const sub = items.reduce((sum, item) => {
      const priceAfterDiscount =
        item.productId.price * (1 - item.productId.discount / 100);
      return sum + priceAfterDiscount * item.quantity;
    }, 0);

    const disc = items.reduce((sum, item) => {
      return (
        sum +
        item.productId.price * (item.productId.discount / 100) * item.quantity
      );
    }, 0);
    const taxAmount = (sub * rate) / 100;
    return {
      subtotal: sub,
      totalDiscount: disc,
      tax: taxAmount,
      total: sub + taxAmount,
      taxRate: rate,
    };
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        loading,
        initialLoading,
        cart,
        addToCart,
        removeFromCart,
        reduceQuantity,
        clearCart,
        totalItems,
        subtotal,
        totalDiscount,
        tax,
        total,
        taxRate,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
