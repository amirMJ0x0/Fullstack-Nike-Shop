import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "../../services/commentServices";



const useAddComment = (productId) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ text, rating }) => await postComment(productId, { text, rating }),
        onSuccess: (res) => {
            console.log("✅ comment posted:", res);
            queryClient.invalidateQueries({ queryKey: ['comments', productId] })
            queryClient.setQueryData(['product', productId], (oldData) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    averageRating: res.averageRating,
                    commentsCount: res.commentsCount
                }
            })
        }
    })
};

export default useAddComment;
