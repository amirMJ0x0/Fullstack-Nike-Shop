import { Alert, AlertIcon, Toast } from "@chakra-ui/react";
import React from "react";
import CustomToast from "../components/share/CustomToast";
import { Helmet } from "react-helmet";

const ProfilePage = () => {
  return (
    <div>
      <Helmet>
        <title>Nike - Profile</title>
      </Helmet>
      <CustomToast
        title="Sign Up"
        message="Dear User , You successfully logged in! Welcome"
        type="success"
      />
    </div>
  );
};

export default ProfilePage;
