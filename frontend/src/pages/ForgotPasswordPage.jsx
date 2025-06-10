import { useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepTitle,
  StepDescription,
  StepSeparator,
  StepNumber,
  StepIcon,
  useSteps,
  Heading,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
  PinInputField,
  PinInput,
  HStack,
  useBreakpointValue,
  useMediaQuery,
} from "@chakra-ui/react";
import api from "../services/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import PasswordInput from "../components/share/PasswordInput";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { SiSimplelogin } from "react-icons/si";
import { MdOutlineLockReset } from "react-icons/md";
import { Helmet } from "react-helmet-async";

const steps = [
  {
    title: "Email",
    description: "Enter your email",
    icon: MdOutlineAlternateEmail,
  },
  { title: "Verify", description: "Enter the code", icon: SiSimplelogin },
  { title: "Reset", description: "Set new password", icon: MdOutlineLockReset },
];

export default function ForgotPasswordPage() {
  const { activeStep, setActiveStep } = useSteps({ initialStep: 0 });
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLargerThan500] = useMediaQuery("(min-width: 501px)");

  useEffect(() => {
    const emailParam = searchParams.get("email");
    const otpParam = searchParams.get("otpToken");
    if (emailParam) setEmail(emailParam);
    if (otpParam) {
      setOtp(otpParam);
      setActiveStep(1);
    }
  }, []);

  useEffect(() => {
    if (otp.length === 6 && !loading) {
      handleVerifyOtp();
    }
  }, [otp]);

  // Email validation
  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  // Password validation (example: min 6 chars)
  const validatePassword = (value) => value.length >= 6;

  // Step 1: Send reset code
  const handleSendEmail = async () => {
    setErrors({});
    if (!validateEmail(email)) {
      setErrors({ email: "Enter a valid email address." });
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/forgot-password", { email });
      toast({
        title: "Check your email",
        description: "A reset code has been sent if the email exists.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
        size: isLargerThan500 ? "lg" : "sm",

      });
      setActiveStep(1);
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 4000,
        isClosable: true,
        size: isLargerThan500 ? "lg" : "sm",
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    setErrors({});
    if (!otp || otp.length < 4) {
      setErrors({ otp: "Enter the code sent to your email." });
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/verify-reset-otp", { email, otp });
      toast({
        title: "Code verified",
        description: "You can now set a new password.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
        size: isLargerThan500 ? "lg" : "sm",
      });
      setActiveStep(2);
    } catch (error) {
      toast({
        title: "Invalid code",
        description:
          error.response?.data?.message || "Invalid or expired code.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
        size: isLargerThan500 ? "lg" : "sm",
      });
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset password
  const handleResetPassword = async () => {
    setErrors({});
    if (!validatePassword(newPassword)) {
      setErrors({ newPassword: "Password must be at least 6 characters." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match." });
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/reset-password", { email, otp, newPassword });
      toast({
        title: "Password reset",
        description: "You can now log in with your new password.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
        size: isLargerThan500 ? "lg" : "sm",
      });
      // Optionally redirect to login page here
      navigate("/login");
      setActiveStep(0);
      setEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
        size: isLargerThan500 ? "lg" : "sm",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxW={{ base: "100%", sm: "95%", md: "xl" }}
      mx="auto"
      mt={{ base: 4, md: 10 }}
      py={{ base: 4, md: 8 }}
      mb={20}
      minH={"max-content"}
      className="max-sm:!padding-x"
    >
      <Helmet>
        <title>Nike - Forgot Password</title>
      </Helmet>
      <Heading
        mb={{ base: "5", sm: "10", md: "10" }}
        fontSize={{ base: "2xl", sm: "2xl", md: "3xl" }}
        textAlign={"center"}
      >
        Forgot Password
      </Heading>
      <Stepper
        index={activeStep}
        mb={{ base: 4, md: 8 }}
        size={window.innerWidth < 400 ? "sm" : "lg"}
        mx={{ base: "auto", sm: "base", md: "0" }}
        w={{ base: "xs", md: "full" }}
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator
              sx={{
                "[data-status=complete] &": {
                  background: "coral",
                  fontWeight: "bold",
                },
                "[data-status=active] &": {
                  borderColor: "coral",
                  background: "rgb(255, 127, 80,0.2)",
                },
              }}
            >
              <StepStatus
                complete={<StepIcon />}
                incomplete={step.icon}
                active={step.icon}
              />
            </StepIndicator>
            <Box flexShrink="0">
              {isLargerThan500 ? (
                <>
                  <StepTitle fontSize={{ base: "sm", md: "md" }}>
                    {step.title}
                  </StepTitle>
                  <StepDescription fontSize={{ base: "xs", md: "sm" }}>
                    {step.description}
                  </StepDescription>
                </>
              ) : null}
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      {/* Step 1: Enter Email */}
      {activeStep === 0 && (
        <VStack spacing={4} maxW={"100%"} mx={{ base: "7%", md: "20%" }}>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Email</FormLabel>
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isDisabled={loading}
              fontSize={{ base: "sm", md: "md" }}
              focusBorderColor="coral"
            />
            <FormErrorMessage fontSize={"xs"}>{errors.email}</FormErrorMessage>
          </FormControl>
          <Button
            bg={"coral"}
            w="full"
            onClick={handleSendEmail}
            isLoading={loading}
            disabled={loading}
            fontSize={{ base: "sm", md: "md" }}
          >
            Send Reset Code
          </Button>
        </VStack>
      )}

      {/* Step 2: Enter OTP */}
      {activeStep === 1 && (
        <VStack spacing={4} maxW={"100%"} mx={"auto"}>
          <FormControl
            isInvalid={!!errors.otp}
            className="flex items-center flex-col gap-2 my-2"
          >
            <FormLabel fontSize={{ base: "sm", md: "md" }}>
              Reset Code
            </FormLabel>
            <HStack justify={"center"}>
              <PinInput
                otp
                value={otp}
                onChange={setOtp}
                isDisabled={loading}
                type="number"
              >
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
            <FormErrorMessage fontSize={"xs"}>{errors.otp}</FormErrorMessage>
          </FormControl>
        </VStack>
      )}

      {/* Step 3: Set New Password */}
      {activeStep === 2 && (
        <VStack spacing={6} maxW={"100%"} mx={"auto"} mt={10}>
          <FormControl isInvalid={!!errors.newPassword}>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>
              New Password
            </FormLabel>
            <PasswordInput
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              isDisabled={loading}
              placeholder="Enter new password"
            />
            <FormErrorMessage fontSize={"xs"}>
              {errors.newPassword}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.confirmPassword}>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>
              Confirm Password
            </FormLabel>
            <PasswordInput
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              isDisabled={loading}
              placeholder="Confirm new password"
            />
            <FormErrorMessage fontSize={"xs"}>
              {errors.confirmPassword}
            </FormErrorMessage>
          </FormControl>
          <Button
            bg={"coral"}
            w="full"
            onClick={handleResetPassword}
            isLoading={loading}
            disabled={loading}
            fontSize={{ base: "sm", md: "md" }}
          >
            Set New Password
          </Button>
        </VStack>
      )}
    </Box>
  );
}
