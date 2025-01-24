import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import {
  Button,
  Heading,
  Input,
  FormControl,
  Box,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "../utils/validation";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });
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
    <Box className="flex justify-center items-center h-screen">
      <Box
        className="w-11/12 md:w-1/2 lg:w-1/3 xl:w-1/4 p-5 bg-slate-100 rounded-lg relative"
        _dark={{ bg: "gray.700" }}
      >
        <a
          onClick={goBack}
          className="absolute left-3 -top-8 flex justify-center items-center text-slate-400 cursor-pointer hover:animate-back"
        >
          <IoIosArrowRoundBack size={"2rem"} /> Back
        </a>
        <a
          href="/"
          className="absolute right-3 -top-8 flex justify-center items-center text-slate-400 cursor-pointer hover:animate-back"
        >
          Home <IoIosArrowRoundForward size={"2rem"} />
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
            console.log(errors);
            onSubmit(data);
          })}
          className="flex flex-col gap-5 mt-10 "
        >
          {/* email input  */}
          <div>
            <Input
              type="text"
              variant={"flushed"}
              placeholder="test@gmail.com"
              {...register("email")}
              focusBorderColor="#ff6452"
            />
            {errors.email?.message && (
              <small className="text-red-600">{errors.email?.message}</small>
            )}
          </div>

          {/* password input  */}

          <FormControl>
            <Input
              type="password"
              variant={"flushed"}
              placeholder="password"
              {...register("password")}
              focusBorderColor="#ff6452"
            />
            {errors.password?.message && (
              <small className="text-red-600 ">
                {errors.password?.message}
              </small>
            )}
          </FormControl>

          <Button
            className="shadow-sm !bg-coral-red hover:!shadow-lg hover:opacity-90 mt-4"
            color={"white"}
            type="submit"
          >
            <span>LOGIN</span>
          </Button>
          <Text
            className="text-sm text-center text-slate-gray font-montserrat tracking-tighter"
            _dark={{ color: "gray.300" }}
          >
            Don't have an account?{" "}
            <Link
              to={"/Register"}
              className="text-coral-red font-semibold underline"
            >
              Sign up now
            </Link>
          </Text>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
