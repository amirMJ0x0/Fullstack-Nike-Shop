import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState();
  const { loginAction } = useAuth();
  const onSubmit = (data) => {
    setData(data);
    if (data.email !== "" && data.password !== "") {
      loginAction(data);
      return;
    }
  };
  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="flex flex-col gap-5"
      >
        <input
          type="text"
          placeholder="test@gmail.com"
          {...register("email")}
        />
        <input
          type="password"
          placeholder="password"
          {...register("password")}
        />
        <button
          className=" flex justify-center p-2 rounded-md w-1/2 self-center bg-gray-900  text-white hover:bg-gray-800"
          type="submit"
        >
          <span>Submit</span>
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
