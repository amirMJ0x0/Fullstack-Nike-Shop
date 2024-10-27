import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../services/productServices";
import { CgSpinner } from "react-icons/cg";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Select,
} from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import useSortedProducts from "../hooks/useSortedProducts";
import { useEffect, useState } from "react";

const ProductsListPage = () => {
  const [sortType, setSortType] = useState("newest");
  useEffect(() => {
    console.log(sortType);
  }, [sortType]);

  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  const sortedProducts = useSortedProducts(data, sortType) || [];

  /* if (isLoading) {
    return (
      <div className="fixed top-1/3 left-1/2 animate-spin text-4xl text-coral-red max-container">
        <CgSpinner />
      </div>
    );
  } */
  if (error) {
    return <div className="max-container">error: {error}</div>;
  }

  const onSelectSortType = (e) => {
    setSortType(e.target.value);
  };

  return (
    <section className="max-container">
      <div className="text-gray-400 my-5">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="./">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Products</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="my-7">ad & banner</div>
      <Divider orientation="horizontal" />

      <div className="grid gap-2 max-md:grid-cols-1 md:grid-cols-4 ">
        <aside className="col-span-1 h-screen max-md:hidden shadow-md">
          {/* Filter  */}
        </aside>
        <div className="col-span-3 h-screen">
          <div className="flex justify-between items-center">
            <div className="">{/* filter in mobile devices */}</div>
            <div className="flex  items-center">
              <p className="info-text">Sort By:</p>
              <Select
                variant={"filled"}
                size={"lg"}
                w={"13rem"}
                m={"5"}
                value={sortType}
                onChange={(e) => onSelectSortType(e)}
              >
                <option value="newest">Newest</option>
                <option value="lowPrice">Price: Low To High</option>
                <option value="highPrice">Price: High To Low</option>
                <option value="views">Most Viewed</option>
                <option value="popularity">Best Seller</option>
              </Select>
            </div>
          </div>
          <div>
            <div className="flex gap-5 flex-wrap mt-4 justify-end">
              {sortedProducts?.map((product) => {
                return (
                  <ProductCard
                    {...product}
                    key={product._id}
                    isLoading={isLoading}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsListPage;
