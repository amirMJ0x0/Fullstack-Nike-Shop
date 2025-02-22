import ProductCard from "../components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../services/productServices";
import { useSearchParams } from "react-router-dom";

const ProductsList = () => {
  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", queryString],
    queryFn: () => getAllProducts(queryString),
  });

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5">
      {products?.map((product) => (
        <ProductCard {...product} key={product._id} isLoading={isLoading} />
      ))}
    </div>
  );
};

export default ProductsList;
