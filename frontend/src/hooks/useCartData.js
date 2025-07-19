import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { getCartFromLocalStorage } from "../utils/cartHelpers";
import { useAuth } from "../context/AuthProvider";

export const useCartData = () => {
    const { user } = useAuth();

    return useQuery({
        queryKey: ["cart", user?._id],
        queryFn: async () => {
            if (user) {
                const { data } = await api.get("/cart");
                return data.cart;
            } else {
                return getCartFromLocalStorage();
            }
        },
        enabled: !!user || typeof window !== "undefined", // allow localStorage read even if no user
        staleTime: 1000 * 60, // 1 min
    });
};
