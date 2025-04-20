import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Loading from "./Loading";

const PrivateRoute = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <Loading />;
  if (!user) return <Navigate to={"/login"} />;
  return <Outlet />;
};

export default PrivateRoute;
