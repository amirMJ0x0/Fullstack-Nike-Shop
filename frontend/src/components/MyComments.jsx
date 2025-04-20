import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getUserComments } from "../../services/userServices";
import {
  Divider,
  Heading,
  Image,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { BiSolidStar, BiStar, BiStoreAlt } from "react-icons/bi";
import moment from "moment";

const MyComments = () => {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["comments"],
    queryFn: getUserComments,
  });

  console.log(data);

  const handleSelectProduct = (productId) => {
    navigate(`/products/${productId}`);
    window.scrollTo(0, 700);
  };
  return (
    <div>
      <Heading size={"lg"} p={2}>My Comments</Heading>
      {data?.length > 0 && (
        <List mt={2} spacing={2}>
          {data?.map((comment, index) => (
            <ListItem
              key={index}
              py={2}
              px={5}
              bgColor={"gray.700"}
              borderRadius={"5px"}
              _hover={{ cursor: "pointer" }}
              display="flex-column"
              alignItems="center"
              onClick={() => handleSelectProduct(comment.productId)}
            >
              <div className="flex items-center">
                <Image
                  src={comment.productImage}
                  boxSize="40px"
                  borderRadius="md"
                  mr={2}
                />
                <Heading
                  fontSize="md"
                  color={"coral"}
                  className="!font-montserrat"
                >
                  {comment.productName}
                </Heading>
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
