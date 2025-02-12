import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../../services/productServices";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartProvider";
import ReactStars from "react-stars";
import {
  Box,
  Button,
  Heading,
  HStack,
  Text,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import CustomModal from "../components/share/Modal";
import { BiSolidChevronRight } from "react-icons/bi";
import { PiUserCircleDuotone } from "react-icons/pi";
import Loading from "../components/share/Loading";

function RadioCard(props) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "#FF6452",
          color: "white",
          borderColor: "gray.600",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

const ProductPage = () => {
  const { productId } = useParams();
  const productImageRef = useRef();
  const { addToCart } = useCart();
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const { cart, removeFromCart } = useCart();
  useEffect(() => {
    const existingItem = cart?.items.find(
      (item) => item.productId == productId
    );
    if (existingItem) setIsInCart(true);
  }, [cart, color]);

  const { getRootProps: getRootPropsSize, getRadioProps: getRadioPropsSize } =
    useRadioGroup({
      name: "size",
      onChange: (value) => setSize(value),
    });
  const { getRootProps: getRootPropsColor, getRadioProps: getRadioPropsColor } =
    useRadioGroup({
      name: "color",
      onChange: (value) => setColor(value),
    });
  const group = getRootPropsSize();
  const group2 = getRootPropsColor();
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
  });
  const handleAddToCart = () => {
    if (size && color) {
      addToCart(product._id, 1, color, size);
    } else {
      setIsError(true);
    }
  };

  const changeMainImage = (imageUrl) => {
    productImageRef.current.src = imageUrl;
  };
  if (isLoading) return <Loading />;
  if (error) return <p>Error loading product details.</p>;

  return (
    <div className="p-8">
      {/* Product Details Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Section */}
        <div className="flex-1">
          <div className="border ">
            <img
              src={product.imageUrl[0]}
              alt={product.name}
              className="rounded-lg"
              ref={productImageRef}
            />
          </div>

          <div className="flex mt-4 gap-4">
            {product.imageUrl.map((img, idx) => (
              <img
                key={idx}
                src={img}
                onClick={() => changeMainImage(img)}
                alt={`Thumbnail ${idx}`}
                className="w-20 h-20 object-cover rounded cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-bold text-orange-600">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-xl font-semibold">${product.price}</p>

          {/* Size Selection */}
          <div>
            <p className="font-medium">Size:</p>
            {/* <div className="flex gap-2 mt-2"> */}
            <HStack {...group}>
              {product.size.map((value) => {
                const radio = getRadioPropsSize({ value });
                return (
                  <RadioCard key={value} {...radio}>
                    {value}
                  </RadioCard>
                );
              })}
            </HStack>
            {/* </div> */}
          </div>
          <CustomModal>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint
              reiciendis, ipsa eius unde earum quaerat exercitationem optio et
              nobis delectus magnam accusamus, dolorum, temporibus nam veritatis
              voluptatibus! Tempora, soluta corrupti.
            </p>
            <button>test</button>
          </CustomModal>
          {/* Color Selection */}
          <div>
            <p className="font-medium">Colors:</p>
            {/* <div className="flex gap-2 mt-2"> */}
            <HStack {...group2}>
              {product.color.map((value) => {
                const radio = getRadioPropsColor({ value });
                return (
                  <RadioCard key={value} {...radio}>
                    {value}
                  </RadioCard>
                );
              })}
            </HStack>
            {isError && (
              <Text color="red.500" py={3}>
                Please select color and size!
              </Text>
            )}

            {/* </div> */}
          </div>

          {/* Add to Cart Button */}
          {isInCart ? (
            <Box className="flex gap-3 !mt-8">
              <Link to={"/cart"}>
                <Button size={"lg"} rightIcon={<BiSolidChevronRight />}>
                  Show in Cart
                </Button>
              </Link>
              <Button
                size={"lg"}
                colorScheme="red"
                onClick={() => {
                  removeFromCart(productId);
                  setIsInCart(false);
                }}
              >
                Remove
              </Button>
            </Box>
          ) : (
            <Button
              size={"lg"}
              className="!mt-8 !text-coral-red"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold">Reviews</h2>
        <div className="grid grid-cols-2">
          <div>
            {product.comments.map((comment, idx) => (
              <div key={idx} className="mt-4 p-4 border rounded-lg">
                <span className="flex items-center gap-1">
                  <PiUserCircleDuotone className="text-xl" />
                  <Heading size={"sm"} className="font-montserrat">
                    {comment.userId?.username}
                  </Heading>
                </span>
                <ReactStars count={5} value={comment.rating} edit={false} />
                <Text className="!font-palanquin">{comment.text}</Text>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
