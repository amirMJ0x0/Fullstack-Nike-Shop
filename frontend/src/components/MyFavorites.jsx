import { useQuery } from "@tanstack/react-query";
import { getSavedProducts } from "../../services/userServices";
import { Heading, Image, List, ListItem, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const MyFavorites = () => {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["favorites"],
    queryFn: getSavedProducts,
  });
  const handleSelectProduct = (productId) => {
    navigate(`/products/${productId}`);
  };
  return (
    <div>
      <Heading size={"lg"} p={2}>My Favorites</Heading>
      {data?.favorites.length > 0 && (
        <List mt={2}>
          {data?.favorites.map((product) => (
            <ListItem
              key={product._id}
              py={2}
              px={5}
              bgColor={"gray.700"}
              borderRadius={"5px"}
              _hover={{ cursor: "pointer" }}
              display="flex"
              alignItems="center"
              onClick={() => handleSelectProduct(product._id)}
            >
              <Image
                src={product.imageUrl}
                boxSize="40px"
                borderRadius="md"
                mr={2}
              />
              <Heading fontSize="sm" color={'coral'}>{product.name}</Heading>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default MyFavorites;
