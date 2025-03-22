import { Alert, AlertIcon, Toast } from "@chakra-ui/react";
import React from "react";
import CustomToast from "../components/share/CustomToast";
import { Helmet } from "react-helmet-async";

const ProfilePage = () => {
  return (
    <div>
      <Helmet>
        <title>Nike - Profile</title>
      </Helmet>
    </div>
  );
};

export default ProfilePage;
