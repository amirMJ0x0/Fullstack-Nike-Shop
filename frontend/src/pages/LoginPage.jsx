import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import {
  Button,
  Heading,
  Input,
  FormControl,
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "../utils/validation";
import { Helmet } from "react-helmet-async";
import PasswordInput from "../components/share/PasswordInput";
import { useState } from "react";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { loginAction } = useAuth();
  const onSubmit = async (data) => {
    if (data.email !== "" && data.password !== "") {
      setLoading(true);
      try {
        await loginAction(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  const goBack = () => {
    history.back();
  };
  return (
    <Box className="flex justify-center items-center h-screen">
      <Helmet>
        <title>Nike - Login</title>
      </Helmet>
      <Box
        className="w-11/12 md:w-1/2 lg:w-1/3 xl:w-1/4 p-5 bg-slate-100 rounded-lg relative"
        _dark={{ bg: "gray.700" }}
      >
        <Link
          onClick={goBack}
          className="absolute left-3 -top-8 flex justify-center items-center text-slate-400 cursor-pointer hover:opacity-80"
          tabIndex={"7"}
        >
          <IoIosArrowRoundBack size={"2rem"} /> Back
        </Link>
        <Link
          to="/"
          tabIndex={"8"}
          className="absolute right-3 -top-8 flex justify-center items-center text-slate-400 cursor-pointer hover:opacity-80"
        >
          Home <IoIosArrowRoundForward size={"2rem"} />
        </Link>
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
            onSubmit(data);
          })}
          className="flex flex-col gap-5 mt-10 "
        >
          {/* email input  */}
          <div>
            <Input
              type="text"
              variant={"flushed"}
              placeholder="Enter Email"
              {...register("email")}
              focusBorderColor="#ff6452"
              tabIndex={"1"}
            />
            {errors.email?.message && (
              <small className="text-red-600">{errors.email?.message}</small>
            )}
          </div>

          {/* password input  */}

          <FormControl>
            <PasswordInput register={register} tabIndex={"2"} />
            <Flex justifyContent={"space-between"}>
              <small className="text-red-600 mt-3">
                {errors.password?.message}
              </small>
              <Button
                className="font-palanquin"
                colorScheme="gray"
                type="submit"
                variant={"link"}
                disabled={loading}
                onClick={() => navigate("/forgot-password")}
                tabIndex={"4"}
                _focus={{
                  textDecoration: "underline",
                  ring: "0",
                  opacity: "0.8",
                }}
                _hover={{
                  opacity: "0.8",
                }}
              >
                <span className="font-sm p-1 font-light">Forgot Password?</span>
              </Button>
            </Flex>
          </FormControl>

          <Button
            className="shadow-sm !bg-coral-red hover:!shadow-lg hover:opacity-90"
            color={"white"}
            type="submit"
            isLoading={loading}
            disabled={loading}
            tabIndex={"5"}
            _focus={{
              opacity: "0.8",
            }}
          >
            <span>LOGIN</span>
          </Button>

          <Text
            className="text-sm text-center text-slate-gray font-montserrat tracking-tighter"
            _dark={{ color: "gray.300" }}
          >
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="text-coral-red font-semibold underline"
              tabIndex={"6"}
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
