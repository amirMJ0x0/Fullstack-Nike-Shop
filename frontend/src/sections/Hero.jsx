import { useRef, useState } from "react";
import { arrowRight } from "../assets/icons";
import { bigShoe1, bigShoe2, bigShoe3 } from "../assets/images";
import Button from "../components/Button";
import { statistics } from "../constants";
import { Swiper, SwiperSlide } from "swiper/react";
import CountUp from "react-countup";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Hero = () => {
  const [isEnded, setIsEnded] = useState(false);

  return (
    <section
      className="w-full flex xl:flex-row lg:min-h-screen max-container"
      id="home"
    >
      <div className="relative xl:w-3/5 flex flex-col max-sm:padding-x max-xl:padding-l justify-start items-start pt-2 md:pt-14 lg:w-1/2">
        <p className="text-sm md:text-xl font-montserrat text-coral-red">
          Our Summer Collection
        </p>
        <h2 className="mt-4 md:mt-10 font-palanquin text-[45px] md:text-[64px] lg:text-[72px] xl:text-[84px] max-sm:leading-[50px] font-bold">
          <span className="xl:whitespace-nowrap z-10 pr-10">
            The <span className="text-coral-red">New</span> Arrival
          </span>
          <br />
          <span className="text-coral-red inline-block mt-3 ">Nike</span> Shoes
        </h2>
        <p className="font-montserrat text-slate-gray text-xs md:text-lg leading-8 mt-2 sm:mt-6 mb-6 md:mb-14 sm:max-w-sm max-sm:max-w-[90%]">
          Discover stylish Nike arrivals, quality comfort, and innovation for
          your active life.
        </p>
        <Button
          label="Shop Now"
          iconURL={arrowRight}
          to={"/products?sort=newest"}
        />

        <div className="flex flex-row justify-between md:justify-start md:items-start flex-wrap w-full mt-10 md:mt-20 gap-6 md:gap-10 xl:gap-16 ">
          {statistics.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl md:text-4xl font-palanquin font-bold">
                {isEnded ? (
                  stat.value
                ) : (
                  <>
                    <CountUp
                      end={stat.num}
                      duration={3}
                      onEnd={() => setIsEnded(true)}
                    />{" "}
                    +
                  </>
                )}
              </p>
              <p className="max-sm:text-sm font-montserrat text-slate-gray leading-7">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex justify-center items-center max-xl:py-14 max-lg:hidden h-[500px] w-2/5 xl:w-1/2 xl:mt-24">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          // navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
        >
          <SwiperSlide>
            <img src={bigShoe1} alt="Shoe 1" className="object-contain " />
          </SwiperSlide>
          <SwiperSlide>
            <img src={bigShoe2} alt="Shoe 2" className="object-contain " />
          </SwiperSlide>
          <SwiperSlide>
            <img src={bigShoe3} alt="Shoe 3" className="object-contain " />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Hero;
