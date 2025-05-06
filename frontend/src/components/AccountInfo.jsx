import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../services/userServices";
import { Button, HStack, Stack, Text } from "@chakra-ui/react";
import { FiEdit3 } from "react-icons/fi";

const AccountInfo = () => {
  const { data } = useQuery({
    queryKey: ["accountInfo"],
    queryFn: getUserProfile,
  });
  console.log(data);

  return (
    <div>
      <HStack>
        <Text>{data?.username}</Text>
        <Button variant={"ghost"} _hover={{ bg: "transparent",color: 'coral' }}>
          <FiEdit3 />
        </Button>
      </HStack>
    </div>
  );
};

export default AccountInfo;
