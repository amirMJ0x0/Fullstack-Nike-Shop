import { useEffect } from "react";
import {
  CustomerReviews,
  Hero,
  PopularProducts,
  Services,
  Subscribe,
  SuperQuality,
} from "../sections";
import Aos from "aos";
import "aos/dist/aos.css";
import BackToTopBtn from "../components/share/BackToTopBtn";
import { Helmet } from "react-helmet-async";

const HomePage = () => {
  useEffect(() => {
    Aos.init({ once: true, duration: 1000 });
  }, []);

  return (
    <main>
      <Helmet>
        <title>Nike - HomePage</title>
      </Helmet>
      <section className="xl:padding-l wide:padding-r padding-b">
        <Hero />
      </section>
      <section className="padding">
        <PopularProducts />
      </section>
      <section className="padding">
        <SuperQuality />
      </section>
      <section className="padding-x py-10 ">
        <Services />
      </section>
      {/* <section className="padding">
        <SpecialOffer />
      </section> */}
      <section className="padding bg-[rgba(0,0,0,0.1)]">
        <CustomerReviews />
      </section>
      <section className="padding-x sm:py-32 py-16 w-full ">
        <Subscribe />
      </section>
      {/* <section className="bg-black padding-x padding-t pb-8">
        <Footer />
      </section> */}
      <BackToTopBtn />
    </main>
  );
};

export default HomePage;
