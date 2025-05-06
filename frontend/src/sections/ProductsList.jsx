import ProductCard from "../components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../services/productServices";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Pagination from "../components/ui/Pagination";
import { Image, Text } from "@chakra-ui/react";
const ProductsList = ({ setShowNotFoundLogo }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const newParams = new URLSearchParams(searchParams);
  const queryString = searchParams.toString();
  const page = parseInt(searchParams.get("page")) || 1;
  const resultRef = useRef(null);
  const [showSkeleton, setShowSkeleton] = useState(true);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["products", queryString],
    queryFn: () => getAllProducts(queryString),
  });
  const { products, totalPages, totalItems } = data || {};

  const scrollToRef = () => window.scrollTo(0, resultRef.current.offsetTop);
  const onPreviousPage = () => {
    newParams.set("page", page - 1);
    setSearchParams(newParams, { replace: true });
  };
  const onNextPage = () => {
    newParams.set("page", page + 1);
    setSearchParams(newParams, { replace: true });
  };
  const goSpecificPage = (pageIndex) => {
    newParams.set("page", pageIndex);
    setSearchParams(newParams, { replace: true });
  };

  useEffect(() => {
    if (!isLoading || !isFetching) {
      setShowSkeleton(false);
    } else {
      setShowSkeleton(true);
    }
  }, [isLoading, isFetching]);

  useEffect(() => {
    setShowNotFoundLogo(
      !isLoading && !isFetching && (!products || products.length === 0)
    );
  }, [products, isLoading, isFetching]);
  return (
    <section>
      {products?.length ? (
        <>
          <Text m={2} color={"coral"} opacity={0.7} ref={resultRef}>
            Results: {totalItems || 0}
          </Text>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 xl:gap-5">
            {products?.map((product) => (
              <ProductCard
                {...product}
                key={product._id}
                isLoading={showSkeleton}
              />
            ))}
          </div>
          <Pagination
            page={page}
            goSpecificPage={goSpecificPage}
            totalPages={totalPages}
            onPreviousPage={onPreviousPage}
            onNextPage={onNextPage}
            scrollToRef={scrollToRef}
          />
        </>
      ) : (
        <div className="flex flex-col justify-center items-center max-xl:mb-20">
          <Image
            src={"No-results-found.png"}
            w={"80%"}
            alt="No Results Found"
          />
          <Text
            color={"coral"}
            className="font-montserrat"
            fontWeight={"black"}
            fontSize={"xl"}
          >
            No results found
          </Text>
          <Text
            color={"gray.500"}
            className="font-montserrat"
            fontWeight={"light"}
            fontSize={{ base: "xs", md: "md" }}
          >
            We Couldn't find what you are searching for.
          </Text>
          <Text
            color={"gray.500"}
            className="font-montserrat"
            fontWeight={"light"}
            fontSize={{ base: "xs", md: "md" }}
          >
            Try searching again or Change the page.
          </Text>
        </div>
      )}
    </section>
  );
};

export default ProductsList;
