import axios from "axios";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "../../services/userServices";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const {
    data: userData = { data: null, userStatus: "Unauthorized" },
    refetch,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
    refetchInterval: 60000,
    retry: false,
  });

  const loginAction = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/auth/login", data, {
        withCredentials: true,
      });
      if (res.status === 200) {
        // navigate("/");
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
        "http://localhost:3000/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      navigate("/");
      refetch();
    } catch (error) {
      console.log("Logout error:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ userData, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
