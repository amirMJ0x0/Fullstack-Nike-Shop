// pages/ErrorPage.jsx
import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ErrorPage = () => {
  const location = useLocation();
  const state = location.state || {};
  const message = state.message || "Something went wrong.";
  const code = state.code || 500;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Helmet>
        <title>Error - Nike Store</title>
      </Helmet>
      <div className="bg-white p-8 rounded-lg shadow-lg w-4/5 max-w-md text-center">
        <h1 className="text-6xl text-red-500 font-bold">{code}</h1>
        <p className="text-xl text-gray-800 mt-4">{message}</p>
        <Link
          to="/"
          className="mt-6 inline-block text-lg text-red-500 font-semibold hover:underline"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
