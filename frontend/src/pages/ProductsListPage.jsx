import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../services/productServices";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Select,
} from "@chakra-ui/react";
import useSortedProducts from "../hooks/useSortedProducts";
import { useEffect, useState, useTransition } from "react";
import SidebarFilterProducts from "../sections/SidebarFilterProducts";
import useFilteredProducts from "../hooks/useFilteredProducts";
import ProductsList from "../sections/ProductsList";
import useDebounce from "../hooks/useDebounce";
import { BsFilter } from "react-icons/bs";

const ProductsListPage = () => {
  const [sortType, setSortType] = useState("newest");
  useEffect(() => {}, [sortType]);

  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  const [filters, setFilters] = useState({});
  const sortedProducts = useSortedProducts(data, sortType) || [];
  const filteredProducts = useFilteredProducts(sortedProducts, filters) || [];

  const [isPending, startTransition] = useTransition();
  const handleCheckboxChange = (filterType, value) => {
    startTransition(() => {
      setFilters((prevFilters) => {
        const newFilters = { ...prevFilters };
        if (!newFilters[filterType]) newFilters[filterType] = new Set();

        const updatedSet = new Set(newFilters[filterType]);
        if (updatedSet.has(value)) {
          updatedSet.delete(value);
        } else {
          updatedSet.add(value);
        }

        newFilters[filterType] = updatedSet;

        return newFilters;
      });
    });
  };
  const debouncedHandleCheckboxChange = useDebounce(handleCheckboxChange, 300);

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
  let windowWidth = window.innerWidth;
  return (
    <section className="max-container max-2xl:padding-x max-sm:px-4">
      <div className="text-gray-400 my-5 mx-4">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="./">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Products</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="my-7 mx-4">Ad & Banner</div>
      {/* <Divider orientation="horizontal" /> */}

      <div className="flex justify-between items-center max-md:mx-2 max-container ">
        {/* Filter Products Section (Mobile Devices)  */}
        <div className="">
          <Button
            colorScheme="orange"
            variant="outline"
            className="md:!hidden flex gap-1"
          >
            <span>Filters</span> <BsFilter />
          </Button>
        </div>

        {/* Sort Products Section  */}
        <div className="flex items-center">
          <p className="info-text !text-sm tracking-tight md:tracking-normal md:text-lg max-sm:hidden">
            Sort By: &nbsp;
          </p>
          <Select
            colorScheme="orange"
            variant={"filled"}
            size={"md"}
            w={windowWidth > 768 ? "13rem" : "8rem"}
            className="text-sm"
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
      <section className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-4">
        {/* Filter Products Section (Desktop Devices)  */}
        <div className="max-lg:hidden col-span-1">
          <SidebarFilterProducts
            filters={filters}
            handleCheckboxChange={debouncedHandleCheckboxChange}
          />
        </div>
        <div className="grid w-full col-span-3 h-screen justify-end">
          {/* Products Section */}

          <ProductsList
            products={filteredProducts}
            isPending={isPending}
            isLoading={isLoading}
          />
        </div>
      </section>
    </section>
  );
};

export default ProductsListPage;
