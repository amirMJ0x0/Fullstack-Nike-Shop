import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "../services/userServices";
import { useToast } from "@chakra-ui/react";
import api from "../services/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetching user info with memoization
  const {
    data: userData = { data: null, userStatus: "Unauthorized" },
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
    refetchInterval: 60000,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Memoize user data
  const user = useMemo(
    () => (userData.userStatus === "Authorized" ? userData.data : null),
    [userData]
  );

  // Handle token refresh
  const handleTokenRefresh = useCallback(async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    try {
      await api.post("/auth/refresh");
      await refetch();
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setIsRefreshing(false);
    }
  }, [isRefreshing, refetch, navigate]);

  // Register Action with memoization
  const registerAction = useCallback(
    async (data) => {
      try {
        const response = await api.post(`/auth/register`, data);
        if (response.status === 201) {
          const loginResponse = await api.post(`/auth/login`, {
            email: data.email,
            password: data.password,
          });
          if (loginResponse.status === 200) {
            toast({
              title: "Registration and Login Successful",
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "top-right",
            });
            navigate("/");
            await refetch();
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    [navigate, refetch, toast]
  );

  // Login Action with memoization
  const loginAction = useCallback(
    async (data) => {
      try {
        const res = await api.post(`/auth/login`, data);
        if (res.status === 200) {
          navigate(-1);
          await refetch();
        }
      } catch (error) {
        console.log("Login error:", error.message);
      }
    },
    [navigate, refetch]
  );

  // Logout Action with memoization
  const logOut = useCallback(async () => {
    try {
      await api.post(`/auth/logout`, {});
      navigate("/");
      await refetch();
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
  }, [navigate, refetch, toast]);

  // Memoize context value
  const contextValue = useMemo(
    () => ({
      user,
      isLoading,
      isRefreshing,
      loginAction,
      logOut,
      registerAction,
      handleTokenRefresh,
    }),
    [
      user,
      isLoading,
      isRefreshing,
      loginAction,
      logOut,
      registerAction,
      handleTokenRefresh,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
