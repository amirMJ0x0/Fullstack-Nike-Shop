import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useParams } from "react-router-dom";
import { getProduct } from "../services/productServices";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartProvider";
import useAddComment from "../hooks/useAddComment";
import ReactStars from "react-rating-stars-component";
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Text,
  useDisclosure,
  useRadioGroup,
} from "@chakra-ui/react";
import { BiPlus, BiSolidChevronRight } from "react-icons/bi";
import { PiUserCircleDuotone } from "react-icons/pi";
import Loading from "../components/share/Loading";
import { Helmet } from "react-helmet-async";
import RadioCard from "../components/share/RadioCard";
import CommentModal from "../components/commentModal";
import { useAuth } from "../context/AuthProvider";
import moment from "moment";
import SaveProduct from "../components/SaveProduct";
import { getCommentsByProductId } from "../services/commentServices";

const ProductPage = () => {
  const { productId } = useParams();
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const {
    isOpen: isModalOpen,
    onClose: onModalClose,
    onOpen: onModalOpen,
  } = useDisclosure();
  const { cart, removeFromCart, addToCart } = useCart();
  const { user } = useAuth();
  const productImageRef = useRef();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
    retry: false,
  });

  const { data: comments } = useQuery({
    queryKey: ["comments", productId],
    queryFn: () => getCommentsByProductId(productId),
  });
  const { mutate, isLoading: isAddingComment } = useAddComment(product?._id);

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

  const handleAddToCart = () => {
    if (size && color) {
      addToCart(product._id, color, size, 1);
    } else {
      setIsError(true);
    }
  };

  const changeMainImage = (imageUrl) => {
    productImageRef.current.src = imageUrl;
  };
  if (isLoading) return <Loading />;
  if (error) return <Navigate to="/not-found" />;
  if (!product) return <Navigate to="/not-found" />;

  return (
    <div className="p-8">
      <Helmet>
        <title>Buy {product.name}</title>
      </Helmet>
      {/* Product Details Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Section */}
        <div className="flex-1">
          <div className="relative border flex justify-center items-center lg:h-[385px] overflow-hidden">
            <div className="absolute top-5 left-5">
              <SaveProduct productId={productId} />
            </div>
            <Image
              src={product.imageUrl[0]}
              alt={product.name}
              ref={productImageRef}
            />
          </div>

          <div className="flex mt-4 gap-4 !z-50">
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

          {/* Color Selection */}
          <div>
            <p className="font-medium">Colors:</p>
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
          </div>
          <HStack className="!flex !items-end">
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
          </HStack>
        </div>
      </div>
      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold">Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="max-md:order-2">
            {comments?.map((comment, idx) => (
              <div key={idx} className="mt-4 p-4 border rounded-lg">
                <span className="flex items-center gap-1">
                  <PiUserCircleDuotone className="text-xl" />
                  <Heading size={"sm"} className="font-montserrat">
                    {comment.user?.username || "Unknown user"}
                  </Heading>
                  <Text fontSize={"sm"} opacity={"0.5"} ml={5}>
                    {moment
                      .utc(comment.date)
                      .local()
                      .startOf("seconds")
                      .fromNow()}
                  </Text>
                </span>
                <ReactStars count={5} value={comment.rating} edit={false} />
                <Text className="!font-palanquin" opacity={"0.8"}>
                  {comment.text}
                </Text>
              </div>
            ))}
          </div>
          <div className="max-md:order-1 mt-4">
            <Box p={2}>
              <Box>
                <div className="flex items-baseline gap-4">
                  <Heading size={"2xl"} color={"coral"}>
                    {product.averageRating.toFixed(1)}
                  </Heading>
                  <Text fontFamily={"monospace"} color={"slategray"}>
                    {product.commentsCount} reviews
                  </Text>
                </div>
                <ReactStars
                  count={5}
                  size={22}
                  edit={false}
                  value={product.averageRating}
                />
              </Box>
              <Box mt={4}>
                {user ? (
                  <>
                    <Button
                      fontWeight={"bold"}
                      color={"coral"}
                      onClick={onModalOpen}
                    >
                      Leave a Review <BiPlus />
                    </Button>
                  </>
                ) : (
                  <div className="text-red-900">
                    <span>You must </span>
                    <Link to={"/login"} className="underline font-bold italic">
                      login
                    </Link>
                    <span> to leave a review</span>
                  </div>
                )}

                <CommentModal
                  isOpen={isModalOpen}
                  onClose={onModalClose}
                  productData={product}
                  isLoading={isAddingComment}
                  onSubmit={({ text, rating }) => {
                    mutate(
                      { text, rating },
                      {
                        onSuccess: () => {
                          setText("");
                          onClose();
                        },
                      }
                    );
                  }}
                />
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
