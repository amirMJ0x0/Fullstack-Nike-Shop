import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import ColorBadge from "./share/ColorBadge";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartProvider";
import { memo } from "react";

const CartItem = memo(({ itemInfo }) => {
  const { removeFromCart, addToCart, reduceQuantity } = useCart();
  const productInfo = itemInfo.productId;
  const priceWithDiscount =
    productInfo.price - productInfo.price * (productInfo.discount / 100);
  return (
    <Box
      _dark={{ bgColor: "#2D3748" }}
      bgColor={"gray.50"}
      rounded={"lg"}
      p={3}
      mb={2}
      display={"flex"}
      justifyContent={"space-between"}
    >
      <div className="w-full">
        <div className="md:flex max-md:grid max-md:grid-cols-2 ">
          <div
            className={`size-32 md:size-36 bg-cover bg-card flex justify-center items-center`}
          >
            <Image
              src={productInfo.imageUrl}
              alt={productInfo.name}
              position="relative"
              w={{ base: "80%", md: "100%" }}
              h={{ base: "120px", md: "160px" }}
              objectFit="contain"
            />
          </div>
          <VStack ml={{ base: 0, md: 4 }} alignItems={"start"}>
            <Heading
              className="lg:hidden"
              textDecoration={productInfo.discount > 0 && "line-through"}
              size={productInfo.discount > 0 ? "xs" : "md"}
              opacity={productInfo.discount > 0 ? "0.7" : "1"}
              fontWeight={productInfo.discount > 0 ? "light" : "bold"}
            >
              ${productInfo?.price?.toFixed(2)}
            </Heading>
            {/* discount  */}
            <Heading className="lg:hidden" size={{ base: "sm", md: "md" }}>
              ${(productInfo.price * (productInfo.discount / 100)).toFixed(2)}
            </Heading>
            <Heading size={{ base: "sm", md: "md" }}>
              <Link to={`/products/` + productInfo._id}>
                {productInfo.name}
              </Link>
            </Heading>

            <ColorBadge productColor={itemInfo.color} />

            <Text fontSize={{ base: "sm", md: "md" }}>
              Size <Link className="underline">{itemInfo.size}</Link>
            </Text>
          </VStack>
        </div>
        <HStack spacing={2} mt={2} maxW={"8rem"} justifyContent={"center"}>
          {itemInfo.quantity > 1 ? (
            <Button
              onClick={() =>
                reduceQuantity({
                  productId: productInfo._id,
                  color: itemInfo.color,
                  size: itemInfo.size,
                })
              }
              size={{ base: "sm", md: "md" }}
              colorScheme="red"
            >
              <BiMinus />
            </Button>
          ) : (
            <Button
              onClick={() => removeFromCart(productInfo._id)}
              colorScheme="red"
              size={{ base: "sm", md: "md" }}
            >
              <BiTrash />
            </Button>
          )}
          <Heading size={"md"}>{itemInfo.quantity}</Heading>
          <Button
            onClick={() =>
              addToCart({
                productId: productInfo._id,
                color: itemInfo.color,
                size: itemInfo.size,
              })
            }
            size={{ base: "sm", md: "md" }}
          >
            <BiPlus />
          </Button>
        </HStack>
      </div>

      {/* price in large devices */}
      <div className="flex gap-2 items-baseline">
        {productInfo.discount > 0 && (
          <Heading className="max-lg:hidden" size={{ base: "sm", md: "md" }}>
            ${priceWithDiscount.toFixed(2)}
          </Heading>
        )}
        <Heading
          size={productInfo.discount > 0 ? "xs" : "md"}
          opacity={productInfo.discount > 0 ? "0.7" : "1"}
          fontWeight={productInfo.discount > 0 ? "light" : "bold"}
          mr={3}
          mt={2}
          className="max-lg:hidden"
          textDecoration={productInfo.discount > 0 && "line-through"}
        >
          ${productInfo?.price?.toFixed(2)}
        </Heading>
      </div>
    </Box>
  );
});
export default CartItem;
