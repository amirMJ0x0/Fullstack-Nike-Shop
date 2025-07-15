// components/SkeletonCard.jsx
import {
  Card,
  CardBody,
  Skeleton,
  SkeletonText,
  Stack,
  CardFooter,
} from "@chakra-ui/react";

const SkeletonCard = () => {
  return (
    <Card
      maxW={{ base: "250px", md: "270px", lg: "280px" }}
      maxH={"max-content"}
      borderRadius={"xl"}
      shadow={{ base: "base", md: "md" }}
    >
      <CardBody p={{ base: "1", md: "2" }}>
        <Skeleton
          borderRadius="2xl"
          // className="w-44 h-36 md:size-64"
          w={{ base: "176px", md: "256px" }}
          h={{ base: "124px", md: "256px" }}
        />

        <Stack
          mt={{ base: "3", md: "4" }}
          spacing={{ base: "2", md: "3" }}
          px={1}
          pb={{ base: 1, sm: 0 }}
        >
          <SkeletonText
            mt="2"
            noOfLines={1}
            skeletonHeight={{ base: "2", md: "4" }}
            width="30%"
          />
          <SkeletonText
            mt="2"
            noOfLines={1}
            skeletonHeight={{ base: "3", md: "4" }}
            width="80%"
          />
          <SkeletonText
            mt="3"
            noOfLines={1}
            skeletonHeight={{ base: "2", md: "3" }}
            width="20%"
          />
        </Stack>
      </CardBody>
    </Card>
  );
};

export default SkeletonCard;
