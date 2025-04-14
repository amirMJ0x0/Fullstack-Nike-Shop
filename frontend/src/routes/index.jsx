import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

const MainLayout = lazy(() => import("../layout/MainLayout"));
const ProductPage = lazy(() => import("../pages/ProductPage"));
const ProductsListPage = lazy(() => import("../pages/ProductsListPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const AccountInfo = lazy(() => import("../components/AccountInfo"));
const Orders = lazy(() => import("../components/Orders"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const CartPage = lazy(() => import("../pages/CartPage"));
const MyComments = lazy(() => import("../components/MyComments"));
const MyFavorites = lazy(() => import("../components/MyFavorites"));
const PrivateRoute = lazy(() => import("../components/share/PrivateRoute"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
        <MainLayout />
      </Suspense>
    ),
    errorElement: <NotFoundPage />,
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
        path: "/login",
        element: (
          <Suspense>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense>
            <RegisterPage />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: (
          <Suspense>
            <PrivateRoute />
          </Suspense>
        ),

        children: [
          {
            path: "",
            element: (
              <Suspense>
                <ProfilePage />
              </Suspense>
            ),
            children: [
              {
                path: "account-info",
                element: (
                  <Suspense>
                    <AccountInfo />
                  </Suspense>
                ),
              },
              {
                path: "orders",
                element: (
                  <Suspense>
                    <Orders />
                  </Suspense>
                ),
              },
              {
                path: "my-favorites",
                element: (
                  <Suspense>
                    <MyFavorites />
                  </Suspense>
                ),
              },
              {
                path: "my-comments",
                element: (
                  <Suspense>
                    <MyComments />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
      {
        path: "/Cart",
        element: (
          <Suspense>
            <CartPage />
          </Suspense>
        ),
      },
    ],
  },
]);
