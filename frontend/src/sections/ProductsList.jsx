import { Skeleton, SkeletonText } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";

const ProductsList = ({ products, isPending, isLoading }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 md:gap-5">
      {products?.map((product) => {
        return isPending ? (
          <div className="flex-1" key={product._id}>
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
              width={"10rem"}
            />
            <SkeletonText
              mt="5"
              noOfLines={1}
              spacing="4"
              skeletonHeight="3"
              width={"4rem"}
            />
          </div>
        ) : (
          <ProductCard {...product} key={product._id} isLoading={isLoading} />
        );
      })}
    </div>
  );
};

export default ProductsList;
