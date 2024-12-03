import { Outlet, useLocation } from "react-router-dom";
import Nav from "../components/Nav";
import AuthProvider from "../context/AuthProvider";

const MainLayout = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/Login" || location.pathname === "/Register";

  return (
    <AuthProvider>
      {!isAuthPage && <Nav />}
      <div>
        <Outlet />
      </div>
    </AuthProvider>
  );
};

export default MainLayout;
