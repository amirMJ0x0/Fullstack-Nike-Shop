import axios from "axios";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "../../services/userServices";
import { useToast } from "@chakra-ui/react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const BASE_URL = "http://localhost:3000";

  const {
    data: userData = { data: null, userStatus: "Unauthorized" },
    refetch,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
    refetchInterval: 60000,
    retry: false,
  });
  const registerAction = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, data);
      if (response.status === 201) {
        const loginResponse = await axios.post(
          `${BASE_URL}/auth/login`,
          { email: data.email, password: data.password },
          { withCredentials: true }
        );
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
  const loginAction = async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, data, {
        withCredentials: true,
      });
      if (res.status === 200) {
        navigate("/");
        refetch();
        // setUserData(res.data.data);
      } else console.log("Login error: ", res.status);
    } catch (error) {
      console.log("Login error:", error.message);
    }
  };

  const logOut = async () => {
    try {
      await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      navigate("/");
      refetch();
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
    <AuthContext.Provider
      value={{ userData, loginAction, logOut, registerAction }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
