import ProductCard from "../components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../services/productServices";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductsList = () => {
  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();
  const {
    data: products,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["products", queryString],
    queryFn: () => getAllProducts(queryString),
  });

  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    if (!isLoading || !isFetching) {
      setShowSkeleton(false);
    } else {
      setShowSkeleton(true);
    }
  }, [isLoading, isFetching]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5">
      {products?.map((product) => (
        <ProductCard {...product} key={product._id} isLoading={showSkeleton} />
      ))}
    </div>
  );
};

export default ProductsList;
