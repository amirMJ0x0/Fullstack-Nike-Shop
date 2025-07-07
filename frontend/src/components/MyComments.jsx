import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Heading,
  Image,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { BiSolidStar } from "react-icons/bi";
import moment from "moment";
import { deleteComment, getMyComments } from "../services/commentServices";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import useModal from "../hooks/useModal";
import CustomModal from "./share/CustomModal";
import { useState } from "react";
import useEditComment from "../hooks/useEditComment";
import CommentModal from "./commentModal";
import EmptyList from "./share/EmptyList";

const MyComments = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditOpen, setEditOpen] = useState(false); //Handle Edit Modal using state
  const [selectedComment, setSelectedComment] = useState(null);
  const { mutate, isPending } = useEditComment();

  const { data: myComments } = useQuery({
    queryKey: ["my-comments"],
    queryFn: getMyComments,
  });

  const handleSelectProduct = (productId) => {
    navigate(`/products/${productId}`);
    window.scrollTo(0, 700);
  };

  //use useMutation hook for deleting comment
  const deleteCommentHandler = async (commentId) => {
    try {
      await deleteComment(commentId);
      queryClient.invalidateQueries(["my-comments"]);
      deleteModal.close();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  const deleteModal = useModal();

  return (
    <div>
      <CustomModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={() => deleteCommentHandler(selectedComment._id)}
        title="Delete Review"
        confirmText="Yes, delete it"
      >
        Are you sure you want to delete this comment? This action cannot be
        undone!
      </CustomModal>

      {selectedComment && (
        <CommentModal
          isOpen={isEditOpen}
          isLoading={isPending}
          onClose={() => setEditOpen(false)}
          productData={selectedComment.productId}
          mode="edit"
          initialData={{
            text: selectedComment.text,
            rating: selectedComment.rating,
          }}
          onSubmit={({ text, rating }) => {
            mutate(
              { commentId: selectedComment._id, text, rating },
              {
                onSuccess: () => {
                  setEditOpen(false);
                  setSelectedComment(null);
                },
              }
            );
          }}
        />
      )}

      <Heading size={"lg"} p={2}>
        My Reviews
      </Heading>
      {myComments?.length > 0 ? (
        <List mt={2} spacing={2}>
          {myComments?.map((comment, index) => (
            <ListItem
              key={index}
              py={2}
              px={{ base: 4, md: 5 }}
              bgColor={"gray.100"}
              _dark={{ bgColor: "gray.700" }}
              borderRadius={"5px"}
              _hover={{ opacity: 0.8 }}
              display="flex-column"
              alignItems="center"
            >
              <div className="flex items-center justify-between">
                <Box display="flex" alignItems="center" mr={{ base: 2, md: 0 }}>
                  <Image
                    src={comment.productId.imageUrl}
                    boxSize="40px"
                    borderRadius="md"
                    mr={2}
                  />
                  <Heading
                    _hover={{ cursor: "pointer" }}
                    fontSize={{ base: "md", md: "lg" }}
                    color={"coral"}
                    className="!font-montserrat"
                    onClick={() => handleSelectProduct(comment.productId._id)}
                  >
                    {comment.productId.name}
                  </Heading>
                </Box>
                <Box
                  display="flex"
                  gap={{ base: 0, md: 1 }}
                  ml={{ base: 1, md: 0 }}
                >
                  <Button
                    variant={"ghost"}
                    _hover={{ color: "coral" }}
                    fontSize={{ base: "md", md: "lg" }}
                    onClick={() => {
                      setSelectedComment(comment);
                      setEditOpen(true);
                    }}
                  >
                    <FiEdit3 />
                  </Button>
                  <Button
                    variant={"ghost"}
                    _hover={{ color: "coral" }}
                    color={"red"}
                    fontSize={{ base: "md", md: "lg" }}
                    p={{ base: 1, md: 2 }}
                    onClick={() => {
                      setSelectedComment(comment);
                      deleteModal.open();
                    }}
                  >
                    <FiTrash2 />
                  </Button>
                </Box>
              </div>
              <div className="flex items-center gap-2">
                <BiSolidStar color="gold" size={"16px"} />{" "}
                <Text
                  fontSize={"sm"}
                  color={"gray.700"}
                  _dark={{ color: "gray.300" }}
                  className="font-palanquin"
                >
                  {comment.rating} Stars
                </Text>{" "}
                <Divider orientation="vertical" h={"20px"} mx={2} />
                <Text fontSize={"sm"} opacity={"0.5"} ml={1}>
                  {moment
                    .utc(comment.date)
                    .local()
                    .startOf("seconds")
                    .fromNow()}
                </Text>
              </div>
              <div className="mt-3">
                <Text fontWeight={{ md: "semibold" }}>{comment.text}</Text>
              </div>
            </ListItem>
          ))}
        </List>
      ) : (
        <EmptyList message={"You have no reviews yet."} />
      )}
    </div>
  );
};

export default MyComments;
