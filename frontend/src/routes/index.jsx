import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
const MainLayout = lazy(() => import("../layout/MainLayout"));
const ProductPage = lazy(() => import("../pages/ProductPage"));
const ProductsList = lazy(() => import("../components/ProductsList"));
const HomePage = lazy(() => import("../pages/HomePage"));
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
            <ProductsList />
          </Suspense>
        ),
      },
      {
        path: "/product:productId",
        element: (
          <Suspense>
            <ProductPage />
          </Suspense>
        ),
      },
    ],
  },
]);
