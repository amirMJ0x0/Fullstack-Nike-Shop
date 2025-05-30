import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";
import {
  Button,
  VStack,
  Heading,
  useToast,
  PinInput,
  PinInputField,
  Box,
  HStack,
  Text,
  Flex,
  Input,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import useModal from "../hooks/useModal";
import { MdEdit } from "react-icons/md";
import CustomModal from "../components/share/CustomModal";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otpToken, setOtpToken] = useState(searchParams.get("otpToken") || "");
  const toast = useToast();
  const [canResend, setCanResend] = useState(false);
  const [verifying, setVerifying] = useState(false); //Prevents multiple submissions
  const isMounted = useRef(true); // Prevents state updates after unmount
  const authChannel = new BroadcastChannel("auth");
  const editModal = useModal();
  const [editedEmail, setEditedEmail] = useState(email);
  const [emailError, setEmailError] = useState("");

  const [secondsRemaining, setSecondsRemaining] = useState(() => {
    const savedExpiresAt = sessionStorage.getItem("expiresAt");
    if (savedExpiresAt) {
      const expiresAtTime = new Date(savedExpiresAt).getTime();
      const now = Date.now();
      const remainingTime = Math.floor((expiresAtTime - now) / 1000); // Use Math.floor here
      return remainingTime > 0 ? remainingTime : 0;
    }
    return 0;
  });

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  //Syncing expiresTime on page load
  useEffect(() => {
    const savedExpiresAt = sessionStorage.getItem("expiresAt");
    if (savedExpiresAt) {
      const expiresAtTime = new Date(savedExpiresAt).getTime();
      const now = Date.now();
      const remainingTime = Math.floor((expiresAtTime - now) / 1000);
      if (remainingTime > 0) {
        setSecondsRemaining(remainingTime);
        setCanResend(false);
      } else {
        setCanResend(true);
      }
    } else {
      setCanResend(true);
    }
  }, []);

  //Countdown Timer
  useEffect(() => {
    if (secondsRemaining <= 0) {
      setCanResend(true);
      return;
    }

    const timerId = setInterval(() => {
      setSecondsRemaining((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [secondsRemaining]);

  // Trigger handleVerify when otpToken reaches 6 digits
  useEffect(() => {
    if (otpToken.length === 6 && !verifying) {
      handleVerify();
    }
  }, [otpToken]);

  const handleVerify = async () => {
    if (verifying) return;
    setVerifying(true);

    const cleanup = () => {
      setVerifying(false);
    };

    try {
      const verifyResponse = await api.post("/auth/verify-email", {
        email,
        otpToken,
      });

      if (verifyResponse.status === 200 && isMounted.current) {
        sessionStorage.removeItem("expiresAt");
        queryClient.invalidateQueries(["userInfo"]);
        toast({
          title: "Email Verified",
          description: "Your email has been successfully verified.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        navigate("/");
        authChannel.postMessage({ type: "AUTH_STATE_CHANGED" });
      }
    } catch (error) {
      console.log("error: ", error);

      if (isMounted.current) {
        const errorMessage =
          error.response?.status === 400
            ? "The OTP you entered is incorrect. Please try again."
            : error.response?.status === 410
            ? "The OTP has expired. Please request a new one."
            : error.response?.data?.message ||
              "Verification failed. Please try again.";
        toast({
          title: "Verification Error",
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    } finally {
      setVerifying(false);
    }

    // Cleanup if component unmounts before async finishes
    return cleanup;
  };

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleEditEmail = async () => {
    if (!validateEmail(editedEmail)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    try {
      // Call your backend to update the email and resend OTP
      await api.post("/auth/update-email", {
        oldEmail: email,
        newEmail: editedEmail,
      });
      toast({
        title: "Email updated!",
        description: "A new verification code has been sent.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      // Update local state and close modal
      setEditedEmail(editedEmail);
      editModal.close();
      // Optionally update the search param or state for email
      window.history.replaceState(
        null,
        "",
        `?email=${encodeURIComponent(editedEmail)}`
      );
    } catch (error) {
      setEmailError(error.response?.data?.message || "Failed to update email.");
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    try {
      const response = await api.post("/auth/resend-verification", { email });

      toast({
        title: "OTP resent!",
        description: "Please check your email inbox.",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });

      const newExpiresAt = new Date(response.data.expiresAt).getTime();
      sessionStorage.setItem("expiresAt", response.data.expiresAt);
      const now = Date.now();
      setSecondsRemaining(Math.floor(newExpiresAt - now) / 1000);
      setCanResend(false);
    } catch (error) {
      console.error("Resend OTP error:", error);
      toast({
        title: "Cannot resend OTP",
        description:
          error.response?.data?.message || "An unexpected error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleModal = () => {
    setModalOpen(true);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="h-screen">
      <CustomModal
        isOpen={editModal.isOpen}
        onClose={editModal.close}
        onConfirm={handleEditEmail}
        title="Edit Email"
        confirmText="Update Email"
      >
        <Input
          type="text"
          variant="flushed"
          placeholder="abcd123@gmail.com"
          value={editedEmail}
          onChange={(e) => setEditedEmail(e.target.value)}
          focusBorderColor="#ff6452"
          isInvalid={!!emailError}
        />
        {emailError && (
          <Text color="red.500" fontSize="sm" mt={2}>
            {emailError}
          </Text>
        )}
      </CustomModal>
      <VStack spacing={4} maxW="md" mx="auto" mt={12}>
        <Heading size="lg" className="!font-montserrat">
          Verify Your Email
        </Heading>
        <Box textAlign={"center"} mb={5}>
          <Text opacity={0.5} className="font-palanquin">
            We have sent verification code to this email:{" "}
          </Text>
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Text opacity={0.7} fontWeight={"bold"} className="font-montserrat">
              {editedEmail}
            </Text>
            <Button
              color={"coral"}
              variant={"unstyled"}
              className="!flex !justify-center !items-center"
              onClick={() => editModal.open()}
            >
              <MdEdit />
            </Button>
          </Flex>
        </Box>

        <HStack>
          <PinInput
            otp
            value={otpToken}
            onChange={(value) => {
              setOtpToken(value);
            }}
            focusBorderColor={otpToken.length === 6 ? "coral" : "gray.300"}
          >
            <PinInputField
              borderColor={otpToken.length === 6 ? "coral" : "gray.300"}
            />
            <PinInputField
              borderColor={otpToken.length === 6 ? "coral" : "gray.300"}
            />
            <PinInputField
              borderColor={otpToken.length === 6 ? "coral" : "gray.300"}
            />
            <PinInputField
              borderColor={otpToken.length === 6 ? "coral" : "gray.300"}
            />
            <PinInputField
              borderColor={otpToken.length === 6 ? "coral" : "gray.300"}
            />
            <PinInputField
              borderColor={otpToken.length === 6 ? "coral" : "gray.300"}
            />
          </PinInput>
        </HStack>
        <Text opacity={0.4}>
          OTP expires in: {formatTime(secondsRemaining)}
        </Text>
        <Box
          fontSize={"sm"}
          display={"flex"}
          gap={1}
          alignItems={"center"}
          className="font-palanquin"
        >
          <Text fontWeight={"light"}>Didn't recieve the email?</Text>
          <Button
            fontSize={"md"}
            variant="link"
            onClick={handleResend}
            disabled={!canResend}
            color={"coral"}
          >
            Click to resend
          </Button>
        </Box>
      </VStack>
    </div>
  );
}
