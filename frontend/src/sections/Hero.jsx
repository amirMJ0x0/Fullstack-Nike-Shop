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
      className="w-full flex xl:flex-row justify-center min-h-screen  max-container "
      id="home"
    >
      <div className="relative xl:w-3/5 flex flex-col justify-start items-start  max-xl:padding-x pt-14 lg:w-1/2">
        <p className="text-xl font-montserrat text-coral-red">
          Our Summer Collection
        </p>
        <h1 className="mt-10 font-palanquin text-8xl max-sm:text-[72px] max-sm:leading-[82px] font-bold">
          <span className="xl:bg-white xl:whitespace-nowrap  z-10 pr-10">
            The New Arrival
          </span>
          <br />
          <span className="text-coral-red inline-block mt-3 ">Nike</span> Shoes
        </h1>
        <p className="font-montserrat text-slate-gray text-lg leading-8 mt-6 mb-14 sm:max-w-sm">
          Discover stylish Nike arrivals, quality comfort, and innovation for
          your active life.
        </p>
        <Button label="Shop Now" iconURL={arrowRight} />

        <div className="flex max-sm:justify-around justify-start items-start flex-wrap w-full mt-20 gap-16 ">
          {statistics.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-palanquin font-bold">
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
              <p className="font-montserrat text-slate-gray leading-7">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative  flex justify-center items-center max-xl:py-14 max-lg:hidden h-[500px] w-1/2 mt-24">
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
