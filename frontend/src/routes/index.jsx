import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import WithSuspense from "../hoc/WithSuspense";
import ErrorPage from "../pages/ErrorPage";

const MainLayout = lazy(() => import("../layout/MainLayout"));
const ProductPage = lazy(() => import("../pages/ProductPage"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const ProductsListPage = lazy(() => import("../pages/ProductsListPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const VerifyEmail = lazy(() => import("../pages/VerfiyEmail"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const ForgotPasswordPage = lazy(() => import("../pages/ForgotPasswordPage"));
const AccountInfo = lazy(() => import("../components/AccountInfo"));
const MyOrdersPage = lazy(() => import("../pages/MyOrdersPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const CartPage = lazy(() => import("../pages/CartPage"));
const MyComments = lazy(() => import("../components/MyComments"));
const MyFavorites = lazy(() => import("../components/MyFavorites"));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage"));
const PaymentResult = lazy(() => import("../pages/PaymentResult"));
const OrderDetailPage = lazy(() => import("../pages/OrderDetailPage"));

const HomePageSuspended = WithSuspense(HomePage);
const NotFoundPageSuspended = WithSuspense(NotFoundPage);
const MainLayoutSuspended = WithSuspense(MainLayout);
const ProductsListPageSuspended = WithSuspense(ProductsListPage);
const ProductPageSuspended = WithSuspense(ProductPage);
const LoginPageSuspended = WithSuspense(LoginPage);
const RegisterPageSuspended = WithSuspense(RegisterPage);
const VerifyEmailSuspended = WithSuspense(VerifyEmail);
const ProfilePageSuspended = WithSuspense(ProfilePage);
const ForgotPasswordPageSuspended = WithSuspense(ForgotPasswordPage);
const AccountInfoSuspended = WithSuspense(AccountInfo);
const OrdersSuspended = WithSuspense(MyOrdersPage);
const MyFavoritesSuspended = WithSuspense(MyFavorites);
const MyCommentsSuspended = WithSuspense(MyComments);
const CartPageSuspended = WithSuspense(CartPage);
const AboutUsSuspended = WithSuspense(AboutUs);
const CheckoutPageSuspended = WithSuspense(CheckoutPage);
const PaymentResultSuspended = WithSuspense(PaymentResult);
const OrderDetailPageSuspended = WithSuspense(OrderDetailPage);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayoutSuspended />,
    errorElement: <ErrorPage />,
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
        path: "/verify-email",
        element: <VerifyEmailSuspended />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPageSuspended />,
      },
      {
        path: "/profile",
        element: <PrivateRoute />,
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
        path: "/Checkout",
        element: <CheckoutPageSuspended />,
      },
      {
        path: "/Cart",
        element: <PrivateRoute />,
        children: [
          {
            path: "",
            element: <CartPageSuspended />,
          },
        ],
      },
      {
        path: "/payment-result",
        element: <PaymentResultSuspended />,
      },
      {
        path: "/orders/:id",
        element: <OrderDetailPageSuspended />,
      },
    ],
  },
]);
