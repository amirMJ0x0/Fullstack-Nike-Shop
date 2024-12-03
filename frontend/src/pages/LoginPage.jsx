import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import {
  Button,
  FormControl,
  Heading,
  Input,
  Link as ChLink,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaBackward } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
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
  const goBack = () => {
    history.back();
  };
  return (
    <div className="flex justify-center items-center h-screen bg-white-400">
      <div className="max-md:w-11/12 md:w-1/4 p-5 bg-slate-100 rounded-lg relative">
        <a
          onClick={goBack}
          className="absolute left-3 -top-8 flex justify-center items-center text-slate-400 cursor-pointer hover:animate-back"
        >
          <IoIosArrowRoundBack size={"2rem"} /> Back
        </a>
        <Heading
          as="h3"
          size="lg"
          textAlign={"center"}
          className="!font-palanquin text-coral-red"
        >
          Login
        </Heading>

        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
            onSubmit(data);
          })}
          className="flex flex-col gap-5 mt-10"
        >
          <Input
            type="text"
            variant={"flushed"}
            placeholder="test@gmail.com"
            {...register("email")}
            focusBorderColor="#ff6452"
          />

          <Input
            type="password"
            variant={"flushed"}
            placeholder="password"
            {...register("password")}
            focusBorderColor="#ff6452"
          />

          <Button
            className="shadow-sm !bg-coral-red hover:!shadow-lg hover:opacity-90 mt-4"
            color={"white"}
            type="submit"
          >
            <span>Submit</span>
          </Button>
          <span className="text-sm text-center text-slate-gray font-montserrat tracking-tighter">
            Don't have an account?{" "}
            <Link
              to={"/Register"}
              className="text-coral-red font-semibold underline"
            >
              Sign up now
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
