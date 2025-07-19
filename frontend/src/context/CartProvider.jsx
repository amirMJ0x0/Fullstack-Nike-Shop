import { createContext, useContext, useEffect, useMemo } from "react";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "./AuthProvider";
import {
  useAddToCart,
  useRemoveFromCart,
  useReduceQuantity,
  useClearCart,
  useMergeCart,
} from "../hooks/useCartMutations";
import { useCartData } from "../hooks/useCartData";
import { getCartFromLocalStorage } from "../utils/cartHelpers";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const toast = useToast();
  const { user } = useAuth();
  const localCart = getCartFromLocalStorage();

  const { data: cart = { items: [] }, isLoading: loading } = useCartData();

  const { mutate: mergeCart } = useMergeCart();
  const { mutate: addToCart } = useAddToCart();
  const { mutate: removeFromCart } = useRemoveFromCart();
  const { mutate: reduceQuantity } = useReduceQuantity();
  const { mutate: clearCart } = useClearCart();

  useEffect(() => {
    if (user && localCart?.items?.length) {
      mergeCart(localCart);
    }
  }, [user]);

  const totalItems = useMemo(
    () => cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0,
    [cart]
  );

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
        cart,
        loading,
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
