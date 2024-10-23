import { Card, CardBody, Image, Stack, Heading, Text } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ imageUrl, name, price, description }) => {
  console.log(imageUrl, name, price);

  return (
    <Card maxW="sm" data-aos="fade-up" shadow="base">
      <CardBody>
        <Image
          src={imageUrl}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
          position="relative"
        />
        <Stack mt="6" spacing="3">
          <Text className="flex items-center gap-2">
            <FaStar className="text-yellow-400 text-2xl" /> (4.5)
          </Text>
          <Heading size="md">{name}</Heading>

          <Text color="coral" fontSize="2xl" fontWeight="semibold">
            {price}$
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
