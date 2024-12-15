import { Alert, AlertIcon, Toast } from "@chakra-ui/react";
import React from "react";
import CustomToast from "../components/share/CustomToast";

const ProfilePage = () => {
  return (
    <div>
      ProfilePage
      <CustomToast
        title="Sign Up"
        message="Dear User , You successfully logged in! Welcome"
        type="success"
      />
    </div>
  );
};

export default ProfilePage;
