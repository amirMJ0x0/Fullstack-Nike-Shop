import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-4/5 max-w-sm text-center">
        <h1 className="text-6xl text-red-500">404</h1>
        <p className="text-lg text-gray-700 mt-4">
          Oops! The page you're looking for does not exist.
        </p>
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

export default NotFoundPage;
