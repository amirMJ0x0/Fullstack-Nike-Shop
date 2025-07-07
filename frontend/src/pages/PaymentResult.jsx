// pages/PaymentResult.jsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Box, Spinner, Text, Heading, Button, VStack } from "@chakra-ui/react";
import api from "../services/api";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const orderId = localStorage.getItem("latestOrderId");

  useEffect(() => {
    const trackId = searchParams.get("trackId");
    if (!trackId) {
      setStatus("error");
      setMessage("Missing payment track ID.");
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await api.post("/pay/zibal/verify", { trackId });
        if (res.data.success) {
          setStatus("success");
          setMessage(res.data.message || "Payment successful!");
        } else {
          setStatus("error");
          setMessage(res.data.message || "Payment failed.");
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
        setMessage(err.response?.data?.message || "Something went wrong");
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <Box mt={10} textAlign="center" mb={64}>
      <VStack spacing={4}>
        <Heading size="lg">Payment Result</Heading>

        {status === "loading" && <Spinner size="xl" />}
        {status === "success" && (
          <Box color="green.500" fontSize={"4xl"}>
            <FaCircleCheck />
          </Box>
        )}
        {status === "error" && (
          <Box color="red.500" fontSize={"4xl"}>
            <FaCircleXmark />
          </Box>
        )}
        {status !== "loading" && (
          <>
            <Text fontSize="lg">{message}</Text>

            {orderId && (
              <Box fontSize="lg">
                Order ID:{" "}
                <Text className="font-palanquin" color={"gray.500"}>
                  {orderId}
                </Text>
              </Box>
            )}

            <Button colorScheme="orange" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default PaymentResult;
