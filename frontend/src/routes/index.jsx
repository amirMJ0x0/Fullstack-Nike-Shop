import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import withSuspense from "../hoc/WithSuspense";

const MainLayout = lazy(() => import("../layout/MainLayout"));
const ProductPage = lazy(() => import("../pages/ProductPage"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
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

const HomePageSuspended = withSuspense(HomePage);
const NotFoundPageSuspended = withSuspense(NotFoundPage);
const MainLayoutSuspended = withSuspense(MainLayout);
const ProductsListPageSuspended = withSuspense(ProductsListPage);
const ProductPageSuspended = withSuspense(ProductPage);
const LoginPageSuspended = withSuspense(LoginPage);
const RegisterPageSuspended = withSuspense(RegisterPage);
const ProfilePageSuspended = withSuspense(ProfilePage);
const AccountInfoSuspended = withSuspense(AccountInfo);
const OrdersSuspended = withSuspense(Orders);
const MyFavoritesSuspended = withSuspense(MyFavorites);
const MyCommentsSuspended = withSuspense(MyComments);
const CartPageSuspended = withSuspense(CartPage);
const PrivateRouteSuspended = withSuspense(PrivateRoute);
const AboutUsSuspended = withSuspense(AboutUs);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayoutSuspended />,
    errorElement: <NotFoundPageSuspended />,
    children: [
      {
        path: "/",
        element: <HomePageSuspended />,
      },
      {
        path: "/not-found",
        element: <NotFoundPageSuspended />,
      },
      {
        path: "/about-us",
        element: <AboutUsSuspended />,
      },
      {
        path: "/products",
        element: <ProductsListPageSuspended />,
      },
      {
        path: "/products/:productId",
        element: <ProductPageSuspended />,
      },
      {
        path: "/login",
        element: <LoginPageSuspended />,
      },
      {
        path: "/register",
        element: <RegisterPageSuspended />,
      },
      {
        path: "/profile",
        element: <PrivateRouteSuspended />,
        children: [
          {
            path: "",
            element: <ProfilePageSuspended />,
            children: [
              {
                path: "account-info",
                element: <AccountInfoSuspended />,
              },
              {
                path: "orders",
                element: <OrdersSuspended />,
              },
              {
                path: "my-favorites",
                element: <MyFavoritesSuspended />,
              },
              {
                path: "my-comments",
                element: <MyCommentsSuspended />,
              },
            ],
          },
        ],
      },
      {
        path: "/Cart",
        element: <CartPageSuspended />,
      },
    ],
  },
]);
