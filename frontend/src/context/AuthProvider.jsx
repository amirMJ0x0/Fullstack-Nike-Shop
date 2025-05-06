import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserInfo } from "../services/userServices";
import { useToast } from "@chakra-ui/react";
import api from "../services/api";
import tabService from "../services/tabService";

const AuthContext = createContext();
const authChannel = new BroadcastChannel("auth");

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isActiveTab, setIsActiveTab] = useState(tabService.isTabActive());
  const [lastRefreshTime, setLastRefreshTime] = useState(0);

  // Listen for tab activity changes
  useEffect(() => {
    const cleanup = tabService.addListener(setIsActiveTab);
    return cleanup;
  }, []);

  // Listen for auth state changes from other tabs
  useEffect(() => {
    const handleAuthMessage = (event) => {
      if (event.data.type === "AUTH_STATE_CHANGED") {
        queryClient.invalidateQueries(["userInfo"]);
      }
    };

    authChannel.addEventListener("message", handleAuthMessage);
    return () => {
      authChannel.removeEventListener("message", handleAuthMessage);
    };
  }, [queryClient]);

  // Fetching user info with memoization
  const {
    data: userData = { data: null, userStatus: "Unauthorized" },
    isLoading,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
    refetchInterval: isActiveTab ? 60000 : false, // Only refetch when tab is active
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
    const now = Date.now();
    // Prevent multiple refresh attempts within 30 seconds
    if (isRefreshing || !isActiveTab || now - lastRefreshTime < 30000) return;
    
    setIsRefreshing(true);
    setLastRefreshTime(now);
    
    try {
      await api.post("/auth/refresh");
      queryClient.invalidateQueries(["userInfo"]);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setIsRefreshing(false);
    }
  }, [isRefreshing, navigate, isActiveTab, lastRefreshTime, queryClient]);

  // Auto refresh token when tab becomes active
  useEffect(() => {
    if (isActiveTab && user) {
      handleTokenRefresh();
    }
  }, [isActiveTab, user, handleTokenRefresh]);

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
            // Notify other tabs
            authChannel.postMessage({ type: "AUTH_STATE_CHANGED" });
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    [navigate, toast]
  );

  // Login Action with memoization
  const loginAction = useCallback(
    async (data) => {
      try {
        const res = await api.post(`/auth/login`, data);
        if (res.status === 200) {
          // Clear all queries and refetch user data
          await queryClient.clear();
          await queryClient.invalidateQueries(["userInfo"]);
          navigate(-1);
          // Notify other tabs
          authChannel.postMessage({ type: "AUTH_STATE_CHANGED" });
        }
      } catch (error) {
        console.log("Login error:", error.message);
      }
    },
    [navigate, queryClient]
  );

  // Logout Action with memoization
  const logOut = useCallback(async () => {
    try {
      await api.post(`/auth/logout`, {});
      // Clear all queries and cache
      await queryClient.clear();
      await queryClient.invalidateQueries(["userInfo"]);
      navigate("/");
      // Notify other tabs
      authChannel.postMessage({ type: "AUTH_STATE_CHANGED" });
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
  }, [navigate, toast, queryClient]);

  // Memoize context value
  const contextValue = useMemo(
    () => ({
      user,
      isLoading,
      isRefreshing,
      isActiveTab,
      loginAction,
      logOut,
      registerAction,
      handleTokenRefresh,
    }),
    [
      user,
      isLoading,
      isRefreshing,
      isActiveTab,
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
