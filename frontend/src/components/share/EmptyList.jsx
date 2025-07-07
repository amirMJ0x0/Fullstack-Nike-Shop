import { Image, Text } from "@chakra-ui/react";

const EmptyList = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center my-20">
      <Image
        className="size-72 md:size-1/3"
        src={"/No-results-found.png"}
        alt="There is no favorites yet."
        loading="lazy"
        opacity={50}
        draggable={false}
      />
      {message && (
        <Text color={"coral"} fontFamily={"Poppins"}>
          {message}
        </Text>
      )}
    </div>
  );
};

export default EmptyList;
