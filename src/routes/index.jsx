import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProductsList from "../components/ProductsList";
import ProductPage from "../components/ProductPage";
import MainLayout from "../layout/MainLayout";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div>error 404</div>,
    children: [
      { path: "/", element: <App /> },
      { path: "/products", element: <ProductsList /> },
      { path: "/product:productId", element: <ProductPage /> },
    ],
  },
]);
