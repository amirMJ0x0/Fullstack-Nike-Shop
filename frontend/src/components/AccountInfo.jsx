import { useQuery } from "@tanstack/react-query";
import { VStack, Divider } from "@chakra-ui/react";
import UsernameSection from "./UsernameSection";
import EmailSection from "./EmailSection";
import PasswordSection from "./PasswordSection";
import UserInfoSection from "./UserInfoSection";

const AccountInfo = () => {
  const { data, refetch } = useQuery({
    queryKey: ["accountInfo"],
    queryFn: async () => {
      const user = await import("../services/userServices");
      return user.getUserProfile();
    },
  });

  return (
    <VStack align={"flex-start"} gap={4} w="full">
      <UsernameSection username={data?.username} refetch={refetch} />
      <Divider />
      <UserInfoSection
        fullName={data?.fullName}
        phone={data?.phone}
        address={data?.address}
        city={data?.city}
        postalCode={data?.postalCode}
        country={data?.country}
        refetch={refetch}
      />
      <Divider />
      <EmailSection
        email={data?.email}
        isVerified={data?.isVerified}
        refetch={refetch}
      />
      <Divider />
      <PasswordSection refetch={refetch} />
    </VStack>
  );
};

export default AccountInfo;
