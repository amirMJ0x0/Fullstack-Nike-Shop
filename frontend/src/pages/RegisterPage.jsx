import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidationSchema } from "../utils/validation";
import { Helmet } from "react-helmet-async";
import PasswordInput from "../components/share/PasswordInput";
import { useState } from "react";

const RegisterPage = () => {
  const { registerAction } = useAuth();
  const [loading, setLoading] = useState();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerValidationSchema),
  });
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await registerAction(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const goBack = () => {
    history.back();
  };
  return (
    <Box className="flex justify-center items-center h-screen">
      <Helmet>
        <title>Nike - Register</title>
      </Helmet>
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
          Register
        </Heading>

        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
          })}
          className="flex flex-col gap-5 mt-10"
        >
          {/* email input */}
          <div>
            <Input
              type="text"
              variant={"flushed"}
              placeholder="username"
              {...register("username")}
              focusBorderColor="#ff6452"
            />
            {errors.username?.message && (
              <small className="text-red-600">{errors.username?.message}</small>
            )}
          </div>

          <div>
            <Input
              type="text"
              variant={"flushed"}
              placeholder="email"
              {...register("email")}
              focusBorderColor="#ff6452"
            />
            {errors.email?.message && (
              <small className="text-red-600">{errors.email?.message}</small>
            )}
          </div>

          <div>
            <PasswordInput register={register} />
            {errors.password?.message && (
              <small className="text-red-600">{errors.password?.message}</small>
            )}
          </div>

          <div>
            <PasswordInput
              register={register}
              purpose={"confirmPassword"}
              placeholder="Confirm Password"
            />

            {errors.confirmPassword?.message && (
              <small className="text-red-600">
                {errors.confirmPassword?.message}
              </small>
            )}
          </div>

          <Button
            className="shadow-sm !bg-coral-red hover:!shadow-lg hover:opacity-90 mt-4"
            color={"white"}
            type="submit"
            isLoading={loading}
            disabled={loading}
          >
            <span>SIGN UP</span>
          </Button>
          <Text
            className="text-sm text-center text-slate-gray font-montserrat tracking-tighter"
            _dark={{ color: "gray.300" }}
          >
            Already Have account?{" "}
            <Link
              to={"/login"}
              className="text-coral-red font-semibold underline"
            >
              Login
            </Link>
          </Text>
        </form>
      </Box>
    </Box>
  );
};

export default RegisterPage;
