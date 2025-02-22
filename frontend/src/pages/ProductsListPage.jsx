import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../services/productServices";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import useSortedProducts from "../hooks/useSortedProducts";
import { useEffect, useRef, useState, useTransition } from "react";
import SidebarFilterProducts from "../sections/SidebarFilterProducts";
import useFilteredProducts from "../hooks/useFilteredProducts";
import ProductsList from "../sections/ProductsList";
import useDebounce from "../hooks/useDebounce";
import { BsFilter } from "react-icons/bs";
import Loading from "../components/share/Loading";
import { Helmet } from "react-helmet";
import FilterProductsDrawer from "../components/FilterProductsDrawer";
import { useSearchParams } from "react-router-dom";

const ProductsListPage = () => {
  // const [sortType, setSortType] = useState("newest");
  // useEffect(() => {}, [sortType]);

  const [searchParams, setSearchParams] = useSearchParams();
  const filters = {
    size: searchParams.getAll("size") || [],
    color: searchParams.getAll("color") || [],
    gender: searchParams.getAll("gender") ? [searchParams.get("gender")] : [],
    price: searchParams.getAll("price") || [],
    sale: searchParams.get("sale") ? true : false,
  };

  

  // const sortedProducts = useSortedProducts(products, sortType) || [];
  // const filteredProducts = useFilteredProducts(sortedProducts, filters) || [];

  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const filterDrawerBtnRef = useRef();
  // const [isPending, startTransition] = useTransition();

  const handleFilterChange = (filterType, value) => {
    const newParams = new URLSearchParams(searchParams);

    if (filterType === "sale") {
      if (newParams.get("sale") === "true") {
        newParams.delete("sale");
      } else {
        newParams.set("sale", "true");
      }
    } else {
      // let existingValues = newParams.getAll(filterType);

      // if (existingValues.includes(value)) {
      //   existingValues = existingValues.filter((v) => v !== value);
      // } else {
      //   existingValues.push(value);
      // }

      // newParams.delete(filterType);

      // existingValues.forEach((v) => newParams.append(filterType, v));

      let existingValues = newParams.getAll(filterType);
      newParams.delete(filterType);

      if (existingValues.includes(value)) {
        existingValues = existingValues.filter((v) => v !== value);
      } else {
        newParams.append(filterType, value);
      }

      existingValues.forEach((v) => newParams.append(filterType, v));
    }

    setSearchParams(newParams);
  };

  const debouncedHandleCheckboxChange = useDebounce(handleFilterChange, 300);

  // if (isLoading) {
  //   return <Loading />;
  // }
  // if (error) {
  //   return <div className="max-container">error: {error}</div>;
  // }

  // const onSelectSortType = (e) => {
  //   setSortType(e.target.value);
  // };
  let windowWidth = window.innerWidth;
  return (
    <section className="max-container max-2xl:padding-x max-sm:px-4">
      <Helmet>
        <title>Nike - Products</title>
      </Helmet>
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
            ref={filterDrawerBtnRef}
            onClick={onDrawerOpen}
            colorScheme="orange"
            variant="outline"
            className="md:!hidden flex gap-1"
          >
            <span>Filters</span> <BsFilter />
          </Button>
          <FilterProductsDrawer
            btnRef={filterDrawerBtnRef}
            onClose={onDrawerClose}
            isOpen={isDrawerOpen}
          >
            <SidebarFilterProducts
              filters={filters}
              handleFilterChange={debouncedHandleCheckboxChange}
            />
          </FilterProductsDrawer>
        </div>

        {/* Sort Products Section  */}
        {/* <div className="flex items-center">
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
        </div> */}
      </div>
      <section className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-4">
        {/* Filter Products Section (Desktop Devices)  */}
        <div className="max-lg:hidden col-span-1">
          <SidebarFilterProducts
            filters={filters}
            handleFilterChange={debouncedHandleCheckboxChange}
          />
        </div>
        <div className="grid !w-full col-span-3 h-screen lg:justify-end">
          {/* Products Section */}

          <ProductsList
          />
        </div>
      </section>
    </section>
  );
};

export default ProductsListPage;
