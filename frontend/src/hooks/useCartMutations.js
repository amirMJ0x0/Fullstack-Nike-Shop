// hooks/useCartMutations.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import {
    addProductToLocalCart,
    removeProductFromLocalCart,
    reduceQuantityFromLocalCart,
    clearCartFromLocalStorage,
} from "../utils/cartHelpers";
import { useAuth } from "../context/AuthProvider";

export const useMergeCart = () => {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    return useMutation({
        mutationFn: async (localCart) => {
            const response = await api.post("/cart/merge", {
                items: localCart.items,
            });
            return response.data.cart;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["cart", user?._id], data);
            clearCartFromLocalStorage();
        },
        onError: (error) => {
            console.error("Merge cart error:", error.message);
        },
    });
};


export const useAddToCart = () => {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    return useMutation({
        mutationFn: async ({ productId, color, size, quantity = 1 }) => {
            if (user) {
                const { data } = await api.post("/cart/add", {
                    productId,
                    quantity,
                    color,
                    size,
                });
                return data.cart;
            } else {
                return addProductToLocalCart(productId, color, size, quantity);
            }
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["cart", user?._id], data);
        },
    });
};

export const useRemoveFromCart = () => {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    return useMutation({
        mutationFn: async (productId) => {
            if (user) {
                const { data } = await api.delete("/cart/remove", {
                    data: { productId },
                });
                return data.cart;
            } else {
                return removeProductFromLocalCart(productId);
            }
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["cart", user?._id], data);
        },
    });
};

export const useReduceQuantity = () => {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    return useMutation({
        mutationFn: async ({ productId, color, size }) => {
            if (user) {
                const { data } = await api.post("/cart/reduce", {
                    productId,
                    color,
                    size,
                });
                return data.cart;
            } else {
                return reduceQuantityFromLocalCart(productId, color, size);
            }
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["cart", user?._id], data);
        },
    });
};

export const useClearCart = () => {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    return useMutation({
        mutationFn: async () => {
            if (!user?._id) {
                clearCartFromLocalStorage();
                localStorage.setItem("forceClearCart", "true");
                return { items: [] };
            }

            const res = await api.delete("/cart");
            return res.data.cart;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["cart", user?._id])
        },
    });
};
