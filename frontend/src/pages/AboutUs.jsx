import { Heading } from "@chakra-ui/react";
import React from "react";

const AboutUs = () => {
  return (
    <div className="padding-x h-screen space-y-5">
      <Heading size={'lg'}>About Us</Heading>
      <p>
        Welcome to Nike! We are a global leader in sportswear and innovation,
        dedicated to inspiring athletes of all levels to achieve their best. Our
        mission is to bring inspiration and innovation to every athlete in the
        world. If you have a body, you are an athlete.
      </p>
      <p>
        At Nike, we believe in the power of sport to move the world forward. We
        are committed to creating sustainable products, fostering inclusivity,
        and empowering communities through our initiatives.
      </p>
      <p>
        Thank you for being a part of our journey. Together, let's push the
        boundaries of what's possible.
      </p>
    </div>
  );
};

export default AboutUs;
