import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
const MainLayout = lazy(() => import("../layout/MainLayout"));
const ProductPage = lazy(() => import("../pages/ProductPage"));
const ProductsListPage = lazy(() => import("../pages/ProductsListPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
        <MainLayout />
      </Suspense>
    ),
    errorElement: <div>error 404</div>,
    children: [
      {
        path: "/",
        element: (
          <Suspense>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/products",
        element: (
          <Suspense>
            <ProductsListPage />
          </Suspense>
        ),
      },
      {
        path: "/products/:productId",
        element: (
          <Suspense>
            <ProductPage />
          </Suspense>
        ),
      },
      {
        path: "/Login",
        element: (
          <Suspense>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "/Register",
        element: (
          <Suspense>
            <RegisterPage />
          </Suspense>
        ),
      },
    ],
  },
]);
