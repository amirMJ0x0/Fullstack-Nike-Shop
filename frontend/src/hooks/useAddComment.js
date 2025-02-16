import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "../../services/productServices";

const useAddComment = (productId) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ text, rating }) => await postComment({ text, rating }, productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['product', productId] })
        }
    })
};

export default useAddComment;
