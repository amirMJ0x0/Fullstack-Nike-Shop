import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "../../services/userServices";
import { useToast } from "@chakra-ui/react";
import axiosInstance from "../../services/axiosInstance";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const toast = useToast();

  // Fetching user info
  const {
    data: userData = { data: null, userStatus: "Unauthorized" },
    refetch,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
    refetchInterval: 60000,
    retry: false,
  });
  const user = userData.userStatus === "Authorized" ? userData.data : null;

  //Register Action
  const registerAction = async (data) => {
    try {
      const response = await axiosInstance.post(`/auth/register`, data);
      if (response.status === 201) {
        // Auto login after registration
        const loginResponse = await axiosInstance.post(`/auth/login`, {
          email: data.email,
          password: data.password,
        });
        if (loginResponse.status === 200) {
          toast({
            title: "Registration and Login Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });

          navigate("/");
          refetch();
        }
      } else {
        console.log("Register error: ", response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Login Action
  const loginAction = async (data) => {
    try {
      const res = await axiosInstance.post(`/auth/login`, data);
      if (res.status === 200) {
        navigate("/");
        refetch(); //Fetch user info after login
      } else console.log("Login error: ", res.status);
    } catch (error) {
      console.log("Login error:", error.message);
    }
  };

  //Logout Action
  const logOut = async () => {
    try {
      await axiosInstance.post(`/auth/logout`, {});
      navigate("/");
      refetch(); //Fetch to confirm logout
      toast({
        title: "Log out Successful",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      console.log("Logout error:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginAction, logOut, registerAction }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
