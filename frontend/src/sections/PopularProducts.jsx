import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../../services/productServices";
import { CgSpinner } from "react-icons/cg";
import useSortedProducts from "../hooks/useSortedProducts";

const PopularProducts = () => {
  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  const popularProducts = useSortedProducts(data, "popularity") || [];

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
    <section id="products" className="max-container max-sm:mt-12">
      <div className="flex flex-col justify-start gap-5">
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
      <div className="mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-14">
        {popularProducts?.slice(0, 4).map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;
