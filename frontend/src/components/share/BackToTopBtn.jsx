import { Box, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdOutlineVerticalAlignTop } from "react-icons/md";

const BackToTopBtn = () => {
  const [scrollPosition, setScrollPosition] = useState();
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      {scrollPosition > 1000 && (
        <Link onClick={() => window.scrollTo({ top: "0" })} title="Back to top">
          <Box
            position="fixed"
            bottom={["20px","30px"]}
            right={["14px", "64px"]}
            zIndex={1}
            bg="#FF6452"
            color="white"
            p="10px"
            borderRadius="10px"
            data-aos="zoom-in"
            // data-aos-duration="1000"
            data-aos-delay="100"
            shadow={"md"}
            fontSize={{base:"xl",md:"3xl"}}
          >
            <MdOutlineVerticalAlignTop />
          </Box>
        </Link>
      )}
    </>
  );
};

export default BackToTopBtn;
