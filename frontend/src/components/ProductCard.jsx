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

const ProductCard = ({ _id, imageUrl, name, price, score, isLoading }) => {
  return (
    <Card maxW="sm" data-aos="fade-up" shadow="none">
      <CardBody>
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
              className={`size-72 bg-cover ${
                !isLoading && "bg-card"
              } flex justify-center items-center`}
            >
              <Image
                src={imageUrl[0]}
                alt={name}
                borderRadius="lg"
                position="relative"
                w={"90%"}
              />
            </div>

            <Stack mt="6" spacing="3">
              <Text className="flex items-center gap-2">
                <FaStar className="text-yellow-400 text-2xl" /> ({score})
              </Text>

              <Link to={`/products/${_id}`}>
                <Heading size="md">{name}</Heading>
              </Link>

              <Text color="coral" fontSize="2xl" fontWeight="semibold">
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
