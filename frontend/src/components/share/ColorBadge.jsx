import { memo } from "react";
import { colors } from "../../constants";
import { Box, Text } from "@chakra-ui/react";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";

const ColorBadge = ({ productColor }) => {
  const { colorMode } = useThemeSwitcher();

  let bgColor = "";
  colors.map((item) => {
    if (productColor === item.name) {
      bgColor = item.className;
    }
  });
  return (
    <div
      className={`border border-white px-2 md:px-3 py-1 rounded-md flex items-center gap-1 md:gap-2 ${
        colorMode === "light" && "border-dark"
      }`}
    >
      <Box
        bgColor={bgColor}
        rounded={"full"}
        w={{ base: "15px", md: "20px" }}
        h={{ base: "15px", md: "20px" }}
        className="!border-coral-red border"
      ></Box>
      <Text fontSize={{ base: "xs", md: "sm" }}>{productColor}</Text>
    </div>
  );
};

export default memo(ColorBadge);
