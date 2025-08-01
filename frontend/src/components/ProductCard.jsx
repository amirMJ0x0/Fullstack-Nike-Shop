import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Skeleton,
  SkeletonText,
  CardFooter,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Aos from "aos";
import useGetWindowWidth from "../hooks/useGetWindowWidth";
import { memo, useEffect } from "react";

const ProductCard = ({
  _id,
  imageUrl,
  name,
  price,
  score,
  entryAnimation = "",
  discount,
}) => {
  useEffect(() => {
    Aos.init({ once: true });
  }, []);

  const windowWidth = useGetWindowWidth();
  const priceWithDiscount = price - price * (discount / 100);
  const shortenHeading = () => {
    if (windowWidth >= 768) {
      return name.length > 24 ? name.slice(0, 22) + "..." : name;
    } else if (windowWidth < 768 && windowWidth > 375) {
      return name.length > 19 ? name.slice(0, 19) + "..." : name;
    } else if (windowWidth <= 375) {
      return name.length > 13 ? name.slice(0, 13) + "..." : name;
    } else {
      return name;
    }
  };
  return (
    <Card
      maxW={{ base: "250px", md: "270px", lg: "280px" }}
      maxH={"max-content"}
      borderRadius={"xl"}
      shadow={{ base: "base", md: "md" }}
      data-aos={entryAnimation}
    >
      <CardBody p={{ base: "1", md: "2" }} pos={"relative"}>
        <div
          className={`h-30 md:h-42 xl:size-64 w-full bg-cover bg-card flex justify-center items-center relative`}
        >
          <Image
            src={imageUrl[0]}
            alt={name}
            w={"100%"}
            h={{ base: "120px", md: "160px" }}
            objectFit="contain"
          />
          <span className="text-white-400 bg-red-500 rounded-lg px-1 max-md:text-xs text-sm absolute top-2 right-2">
            {discount > 0 && `${discount}%`}
          </span>
        </div>

        <Stack
          mt={{ base: "3", md: "4" }}
          spacing={{ base: "2", md: "3" }}
          px={1}
          pb={{ base: 1, sm: 0 }}
        >
          <Text className="flex items-center gap-1 md:gap-2 max-sm:text-xs">
            <FaStar className="text-yellow-400 text-lg sm:text-2xl" /> ({score})
          </Text>

          <Link to={`/products/${_id}`}>
            <Heading
              letterSpacing={"tighter"}
              size={{ base: "xs", md: "sm", xl: "md" }}
              maxW={"-moz-max-content"}
            >
              {shortenHeading()}
            </Heading>
          </Link>
        </Stack>
        <CardFooter px={1} py={2} gap={2} alignItems={"center"}>
          {discount > 0 && (
            <Text
              color="coral"
              fontSize={{ base: "md", md: "2xl" }}
              fontWeight="semibold"
            >
              {priceWithDiscount}$
            </Text>
          )}
          <Text
            color={discount > 0 ? "gray.400" : "coral"}
            fontSize={
              discount > 0
                ? { base: "xs", md: "md" }
                : { base: "md", md: "2xl" }
            }
            opacity={discount > 0 ? "0.7" : "1"}
            fontWeight={discount > 0 ? "light" : "semibold"}
            textDecoration={discount > 0 ? "line-through" : "none"}
          >
            {price}$
          </Text>
        </CardFooter>
      </CardBody>
    </Card>
  );
};

export default memo(ProductCard);
