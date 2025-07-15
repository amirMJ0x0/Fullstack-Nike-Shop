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
        <Skeleton borderRadius="2xl" className="size-64" />

        <Stack
          mt={{ base: "3", md: "4" }}
          spacing={{ base: "2", md: "3" }}
          px={1}
          pb={{ base: 1, sm: 0 }}
        >
          <SkeletonText mt="2" noOfLines={1} skeletonHeight="4" width="30%" />
          <SkeletonText mt="2" noOfLines={1} skeletonHeight="4" width="80%" />
          <SkeletonText mt="3" noOfLines={1} skeletonHeight="3" width="40%" />
        </Stack>
      </CardBody>

      <CardFooter px={1} py={2}>
        <Stack direction="row" spacing={4} align="center" w="100%">
          <Skeleton height="20px" width="60px" />
          <Skeleton height="20px" width="40px" />
        </Stack>
      </CardFooter>
    </Card>
  );
};

export default SkeletonCard;
