import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../services/productServices";
import { CgSpinner } from "react-icons/cg";
import { Divider, Select } from "@chakra-ui/react";
import ProductCard from "./ProductCard";

const ProductsList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => getAllProducts(),
  });
  if (isLoading) {
    return (
      <div className="fixed top-1/3 left-1/2 animate-spin text-4xl text-coral-red max-container">
        <CgSpinner />
      </div>
    );
  }
  if (error) {
    return <div className="max-container">{error}</div>;
  }
  console.log(data);

  return (
    <section className="max-container">
      <div className="">links</div>
      <div className="">ad</div>
      <Divider orientation="horizontal" />

      <div className="grid gap-2 max-md:grid-cols-1 md:grid-cols-4 ">
        <aside className="col-span-1 h-screen max-md:hidden shadow-md"></aside>
        <div className="col-span-3 h-screen">
          <div className="flex justify-between items-center">
            <div className="">filter</div>
            <Select size={"lg"} w={"13rem"}>
              <option value="option1" disabled>
                Sort by
              </option>
              <option value="option2">Price: Low To High</option>
              <option value="option3">Price: High To Low</option>
              <option value="option3">Newest</option>
              <option value="option3">Most Viewed</option>
            </Select>
          </div>
          <div>
            <div className="flex gap-3">
              {data.map((product) => {
                return <ProductCard {...product} key={product._id} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsList;
