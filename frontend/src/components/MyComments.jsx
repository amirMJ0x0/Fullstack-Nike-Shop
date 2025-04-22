import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
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
import { deleteComment, getMyComments } from "../../services/commentServices";
import { FiEdit3, FiTrash, FiTrash2 } from "react-icons/fi";

const MyComments = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: myComments } = useQuery({
    queryKey: ["my-comments"],
    queryFn: getMyComments,
  });

  console.log(myComments);

  const handleSelectProduct = (productId) => {
    navigate(`/products/${productId}`);
    window.scrollTo(0, 700);
  };

  //use useMutation hook for deleting comment
  const deleteCommentHandler = async (commentId) => {
    try {
      await deleteComment(commentId);
      queryClient.invalidateQueries(["my-comments"]);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div>
      <Heading size={"lg"} p={2}>
        My Comments
      </Heading>
      {myComments?.length > 0 && (
        <List mt={2} spacing={2}>
          {myComments?.map((comment, index) => (
            <ListItem
              key={index}
              py={2}
              px={5}
              bgColor={"gray.700"}
              borderRadius={"5px"}
              _hover={{ cursor: "pointer" }}
              display="flex-column"
              alignItems="center"
            >
              <div className="flex items-center justify-between">
                <Box display="flex" alignItems="center">
                  <Image
                    src={comment.productId.imageUrl}
                    boxSize="40px"
                    borderRadius="md"
                    mr={2}
                  />
                  <Heading
                    fontSize="md"
                    color={"coral"}
                    className="!font-montserrat"
                    onClick={() => handleSelectProduct(comment.productId._id)}
                  >
                    {comment.productId.name}
                  </Heading>
                </Box>
                <Box display="flex" gap={1}>
                  <Button
                    variant={"ghost"}
                    _hover={{ color: "coral" }}
                    fontSize={"lg"}
                  >
                    <FiEdit3 />
                  </Button>
                  <Button
                    variant={"ghost"}
                    _hover={{ color: "coral" }}
                    color={"red"}
                    fontSize={"lg"}
                    onClick={() => deleteCommentHandler(comment._id)}
                  >
                    <FiTrash2 />
                  </Button>
                </Box>
              </div>
              <div className="flex items-center gap-2">
                <BiSolidStar color="gold" size={"16px"} />{" "}
                <Text
                  fontSize={"sm"}
                  color={"gray.300"}
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
                <Text>{comment.text}</Text>
              </div>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default MyComments;
