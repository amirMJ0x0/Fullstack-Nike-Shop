import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../services/userServices";
import { Button, HStack, Text } from "@chakra-ui/react";
import { FiEdit3 } from "react-icons/fi";
import EditUsernameModal from "./EditUsernameModal";

const AccountInfo = () => {
  const { data, refetch } = useQuery({
    queryKey: ["accountInfo"],
    queryFn: getUserProfile,
  });
  console.log(data);

  return (
    <div>
      <HStack>
        <Text>{data?.username}</Text>
        <EditUsernameModal
          currentUsername={data?.username}
          onSuccess={refetch}
        />
        {/* <Button
          variant={"ghost"}
          _hover={{ bg: "transparent", color: "coral" }}
        >
          <FiEdit3 />
        </Button> */}
      </HStack>
      <HStack>
        <Text>{data?.email}</Text>
        <Button
          variant={"ghost"}
          _hover={{ bg: "transparent", color: "coral" }}
        >
          <FiEdit3 />
        </Button>
      </HStack>
      <Button>Change Password</Button>
    </div>
  );
};

export default AccountInfo;
