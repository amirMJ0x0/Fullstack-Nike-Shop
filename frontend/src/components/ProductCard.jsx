import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Aos from "aos";

const ProductCard = ({
  _id,
  imageUrl,
  name,
  price,
  score,
  isLoading,
  entryAnimation = "",
}) => {
  Aos.init({
    once: true,
  });
  return (
    <Card
      maxW={"-webkit-max-content"}
      borderRadius={"2xl"}
      shadow="md"
      data-aos={entryAnimation}
    >
      <CardBody p={{ base: "1", md: 3 }}>
        {isLoading ? (
          <>
            <Skeleton borderRadius="2xl" className="size-72"></Skeleton>

            <SkeletonText
              mt="4"
              noOfLines={1}
              spacing="4"
              skeletonHeight="4"
              width={"5rem"}
            />

            <SkeletonText
              mt="1"
              noOfLines={1}
              spacing="4"
              skeletonHeight="4"
              width={"80%"}
            />
            <SkeletonText
              mt="5"
              noOfLines={1}
              spacing="4"
              skeletonHeight="3"
              width={"4rem"}
            />
          </>
        ) : (
          <>
            <div
              className={`h-40 md:size-72 bg-cover ${
                !isLoading && "bg-card"
              } flex justify-center items-center `}
            >
              <Image
                src={imageUrl[0]}
                alt={name}
                position="relative"
                w={"80%"}
                h={{ base: "120px", md: "180px" }}
                objectFit="cover"
              />
            </div>

            <Stack mt={{ base: "2", md: "4" }} spacing={{ base: "1", md: "3" }}>
              <Text className="flex items-center gap-2 max-sm:text-sm">
                <FaStar className="text-yellow-400 text-xl sm:text-2xl" /> (
                {score})
              </Text>

              <Link to={`/products/${_id}`}>
                <Heading
                  letterSpacing={"tight"}
                  size={{ base: "sm", md: "md" }}
                  // className="text-md tracking-tighter md:text-xl font-bold"
                >
                  {name}
                </Heading>
              </Link>

              <Text
                color="coral"
                fontSize={{ base: "md", md: "2xl" }}
                fontWeight="semibold"
              >
                {price}$
              </Text>
            </Stack>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default ProductCard;
