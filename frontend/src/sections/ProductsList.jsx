import ProductCard from "../components/ProductCard";
import { useRef } from "react";
import Pagination from "../components/ui/Pagination";
import { Image, Text } from "@chakra-ui/react";
import { useProductQuery } from "../hooks/useProductQuery";
import SkeletonCard from "../components/SkeletonCard";
const ProductsList = () => {
  const resultRef = useRef(null);
  const {
    page,
    data,
    isLoading,
    isFetching,
    onPreviousPage,
    onNextPage,
    goSpecificPage,
  } = useProductQuery();

  const { products, totalPages, totalItems } = data || {};
  const scrollToRef = () => {
    if (resultRef.current) window.scrollTo(0, resultRef.current.offsetTop);
  };

  const isLoadingState = isLoading || isFetching;

  return (
    <section
      className={
        isLoadingState ? "flex items-center justify-center" : "lg:ml-12"
      }
    >
      <Text
        m={2}
        color="coral"
        opacity={0.7}
        ref={resultRef}
        display={isLoadingState ? "none" : "block"}
      >
        Results: {totalItems || 0}
      </Text>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 xl:gap-5">
        {isLoadingState ? (
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : products?.length ? (
          products.map((product) => (
            <ProductCard {...product} key={product._id} />
          ))
        ) : (
          <div className="col-span-3 flex flex-col justify-center items-center max-xl:mb-20">
            <Image src="No-results-found.png" w="40%" alt="No Results Found" />
            <Text color="coral" fontWeight="black" fontSize="xl">
              No results found
            </Text>
            <Text color="gray.500" fontSize={{ base: "xs", md: "md" }}>
              Try searching again or change the page.
            </Text>
          </div>
        )}
      </div>

      {!isLoadingState && !!products?.length && (
        <Pagination
          page={page}
          goSpecificPage={goSpecificPage}
          totalPages={totalPages}
          onPreviousPage={onPreviousPage}
          onNextPage={onNextPage}
          scrollToRef={scrollToRef}
        />
      )}
    </section>
  );
};

export default ProductsList;
