import { useQuery } from "@tanstack/react-query";
import { getSavedProducts } from "../services/userServices";
import { Heading, Image, List, ListItem, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Loading from "./share/Loading";

const MyFavorites = () => {
  const navigate = useNavigate();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["favorites"],
    queryFn: getSavedProducts,
  });
  const handleSelectProduct = (productId) => {
    navigate(`/products/${productId}`);
  };
  if (isLoading || isFetching) return <Loading />;

  return (
    <div>
      <Heading size={"lg"} p={2}>
        My Favorites
      </Heading>
      {data?.favorites.length > 0 ? (
        <List mt={2}>
          {data?.favorites.map((product) => (
            <ListItem
              key={product._id}
              py={2}
              px={5}
              mb={2}
              bgColor={"gray.200"}
              _dark={{ bg: "gray.900" }}
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
              <Heading fontSize="sm" color={"coral"}>
                {product.name}
              </Heading>
            </ListItem>
          ))}
        </List>
      ) : (
        <div className="flex justify-center my-20">
          <Image
            className="size-72 md:size-1/3"
            src={"/No-results-found.png"}
            alt="There is no favorites yet."
            loading="lazy"
            opacity={50}
            draggable={false}
          />
        </div>
      )}
    </div>
  );
};

export default MyFavorites;
