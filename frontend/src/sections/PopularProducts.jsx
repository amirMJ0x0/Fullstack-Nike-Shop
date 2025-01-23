import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../../services/productServices";
import useSortedProducts from "../hooks/useSortedProducts";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { useRef, useState } from "react";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button } from "@chakra-ui/react";

const PopularProducts = () => {
  const { data, error } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  const popularProducts = useSortedProducts(data, "popularity") || [];
  const swiperRef = useRef();
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);
  if (error) {
    return <div className="max-container">{error}</div>;
  }

  return (
    <section id="products" className="relative max-container max-sm:mt-12">
      <div className="flex flex-col justify-start gap-3">
        <h2 data-aos="fade-right" className="text-4xl font-bold font-palanquin">
          <span className="text-coral-red">Popular</span> Products
        </h2>
        <p
          data-aos="zoom-in"
          className="text-slate-gray font-montserrat lg:max-w-lg"
        >
          Experience top-notch quality and style with our sought-after
          selections. Discover a world of comfort, design, and value
        </p>
      </div>
      <div className="mt-16 relative">
        <Swiper
          className="!pb-2"
          slidesPerView={2}
          spaceBetween={10}
          pagination={{
            type: "custom",
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1440: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onActiveIndexChange={(swiper) => {
            if (swiper.isBeginning) setIsFirstSlide(true);
            else if (swiper.isEnd) setIsLastSlide(true);
            else {
              setIsFirstSlide(false);
              setIsLastSlide(false);
            }
          }}
          modules={[Pagination, Navigation]}
        >
          {popularProducts?.slice(0, 6).map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard {...product} entryAnimation="fade-down" />
            </SwiperSlide>
          ))}
        </Swiper>
        <Button
          onClick={() => {
            swiperRef.current?.slideNext();
          }}
          disabled={isLastSlide}
          pos={"absolute"}
          right={"2"}
          top={"33%"}
          p={"2"}
          rounded={"full"}
          zIndex={"40"}
          shadow={"md"}
          size={{ base: "sm", md: "xl" }}
        >
          <FaChevronRight className="text-sm sm:text-md md:text-2xl text-coral-red" />
        </Button>
        <Button
          disabled={isFirstSlide}
          pos={"absolute"}
          left={"2"}
          top={"33%"}
          p={"2"}
          rounded={"full"}
          zIndex={"40"}
          shadow={"md"}
          size={{ base: "sm", md: "xl" }}
          onClick={() => {
            swiperRef.current?.slidePrev();
          }}
        >
          <FaChevronLeft className="text-sm sm:text-md md:text-2xl text-coral-red" />
        </Button>
      </div>
    </section>
  );
};

export default PopularProducts;
