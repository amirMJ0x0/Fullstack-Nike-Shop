import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComment } from "../../services/commentServices";

const useEditComment = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async ({ commentId, text, rating }) => await updateComment(commentId, { text, rating }),
        onSuccess: () => {
            qc.invalidateQueries(["my-comments"]);
        },
    })
};

export default useEditComment;
