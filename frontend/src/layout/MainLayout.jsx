import { Outlet, useLocation } from "react-router-dom";
import Nav from "../components/Nav";
import AuthProvider from "../context/AuthProvider";
import { CartProvider } from "../context/CartProvider";
import { Footer } from "../sections";

const MainLayout = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/Login" || location.pathname === "/Register";

  return (
    <AuthProvider>
      <CartProvider>
        {!isAuthPage && <Nav />}
        <div>
          <Outlet />
        </div>
        {!isAuthPage && <Footer />}
      </CartProvider>
    </AuthProvider>
  );
};

export default MainLayout;
