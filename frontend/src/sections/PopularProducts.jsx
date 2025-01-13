import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../../services/productServices";
import { CgSpinner } from "react-icons/cg";
import useSortedProducts from "../hooks/useSortedProducts";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { useRef, useState } from "react";

import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PopularProducts = () => {
  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  const popularProducts = useSortedProducts(data, "popularity") || [];
  const swiperRef = useRef();

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
  // فیلتر کردن و مرتب‌سازی محصولات بر اساس sellCount
  // const popularProducts = data
  //   .filter((product) => product.sellCount > 38) // فقط محصولاتی که فروش داشته‌اند
  //   .sort((a, b) => b.sellCount - a.sellCount) // مرتب‌سازی به صورت نزولی
  //   .slice(0, 4); // انتخاب 10 محصول پرفروش

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
      <div className="relative mt-16">
        <Swiper
          slidesPerView={1}
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
            console.log(swiper.activeIndex);
          }}
          modules={[Pagination, Navigation]}
        >
          {popularProducts?.slice(0, 6).map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          onClick={() => {
            swiperRef.current?.slideNext();
            console.log(swiperRef.current?.activeIndex);
          }}
          // disabled={swiperRef.current?.activeIndex === 3 ? "true" : "false"}
          className="absolute right-5 top-1/3 p-2 rounded-full disabled:opacity-50 z-40 outline-none shadow-md bg-slate-200"
        >
          <FaChevronRight className="text-2xl text-coral-red" />
        </button>
        <button
          onClick={() => {
            swiperRef.current?.slidePrev();
            console.log(swiperRef.current?.activeIndex);
          }}
          className="absolute left-3 top-1/3 p-2 rounded-full z-40 outline-none shadow-md bg-slate-200"
        >
          <FaChevronLeft className="text-2xl text-coral-red" />
        </button>
      </div>

      {/* <div className="mt-16 flex flex-wrap sm:gap-6 gap-14">
        {popularProducts?.slice(0, 4).map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div> */}
    </section>
  );
};

export default PopularProducts;
