import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import SidebarFilterProducts from "../sections/SidebarFilterProducts";
import ProductsList from "../sections/ProductsList";
import useDebounce from "../hooks/useDebounce";
import { BsFilter } from "react-icons/bs";
import { Helmet } from "react-helmet-async";
import FilterProductsDrawer from "../components/FilterProductsDrawer";
import { useSearchParams } from "react-router-dom";

const ProductsListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSort = searchParams.get("sort") || "mostRelevant";
  const [sortType, setSortType] = useState(initialSort);
  const [showNotFoundLogo, setShowNotFoundLogo] = useState();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const filterDrawerBtnRef = useRef();

  const filters = {
    size: searchParams.getAll("size") || [],
    color: searchParams.getAll("color") || [],
    gender: searchParams.getAll("gender") || [],
    price: searchParams.getAll("price") || [],
    sale: searchParams.get("sale") ? true : false,
  };

  const handleFilterChange = (filterType, value) => {
    const newParams = new URLSearchParams(searchParams);

    if (filterType === "sale") {
      if (newParams.get("sale") === "true") {
        newParams.delete("sale");
      } else {
        newParams.set("sale", "true");
      }
    } else {
      let existingValues = newParams.getAll(filterType);
      newParams.delete(filterType);

      if (existingValues.includes(value)) {
        existingValues = existingValues.filter((v) => v !== value);
      } else {
        newParams.append(filterType, value);
      }

      existingValues.forEach((v) => newParams.append(filterType, v));
    }

    setSearchParams(newParams, { replace: true });
  };

  const onSelectSortType = (e) => {
    const selectedSort = e.target.value;
    setSortType(selectedSort);

    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", selectedSort);
    setSearchParams(newParams, { replace: true });
  };

  const debouncedHandleCheckboxChange = useDebounce(handleFilterChange, 300);

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

      <div className="flex justify-between items-center max-md:mx-2 max-container max-sm:gap-2">
        {/* Filter Products Section (Mobile Devices)  */}
        <div className="">
          <Button
            ref={filterDrawerBtnRef}
            onClick={onDrawerOpen}
            colorScheme="gray"
            variant="outline"
            className="lg:!hidden"
            rightIcon={<BsFilter />}
          >
            Filters
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
        <div className="flex items-center">
          <p className="info-text !text-sm tracking-tight md:tracking-normal md:text-lg max-sm:hidden">
            Sort By: &nbsp;
          </p>
          <Select
            colorScheme="orange"
            variant={"filled"}
            size={"md"}
            w={{ base: "10rem", md: "13rem" }}
            className="text-sm"
            value={sortType}
            onChange={(e) => onSelectSortType(e)}
          >
            <option value="mostRelevant">Most relevant</option>
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
            handleFilterChange={debouncedHandleCheckboxChange}
          />
        </div>
        <div
          className={`grid !w-full col-span-3 ${
            showNotFoundLogo ? "lg:justify-center" : "lg:justify-end"
          }`}
        >
          {/* Products Section */}
          <ProductsList setShowNotFoundLogo={setShowNotFoundLogo} />
        </div>
      </section>
    </section>
  );
};

export default ProductsListPage;
