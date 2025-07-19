// pages/PaymentResult.jsx
import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Box, Spinner, Text, Heading, Button, VStack } from "@chakra-ui/react";
import api from "../services/api";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import { useCart } from "../context/CartProvider";
import { useAuth } from "../context/AuthProvider";

const PaymentResult = () => {
  const { clearCart } = useCart();
  const [cartCleared, setCartCleared] = useState(false);
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const { user, isLoading } = useAuth();
  const [hasVerified, setHasVerified] = useState(false);

  const navigate = useNavigate();
  const { id, orderNum } = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("latestOrderId") || "{}");
    } catch {
      return {};
    }
  }, []);

  const trackId = searchParams.get("trackId");

  useEffect(() => {
    const verifyPayment = async () => {
      const trackId = searchParams.get("trackId");
      if (!trackId) {
        setStatus("error");
        setMessage("Missing payment track ID.");
        return;
      }
      try {
        const res = await api.post("/pay/zibal/verify", { trackId });
        if (res.data.success) {
          setStatus("success");
          setMessage(res.data.message || "Payment successful!");
          if (user && !cartCleared) {
            await clearCart();
            setCartCleared(true);
          }
        } else {
          setStatus("error");
          setMessage(res.data.message || "Payment failed.");
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
        setMessage(err.response?.data?.message || "Something went wrong");
      } finally {
        setHasVerified(true); // ✅ جلوگیری از رفرش مجدد
      }
    };

    if (!isLoading && !hasVerified) {
      verifyPayment();
    }
  }, [user, searchParams, isLoading, hasVerified]);
  useEffect(() => {
    console.log("⏳ useEffect running: ", { user, isLoading, hasVerified });
  }, [user, isLoading, hasVerified]);

  return (
    <Box mt={10} textAlign="center" mb={64}>
      <VStack spacing={4}>
        <Helmet>
          <title>Payment Result</title>
        </Helmet>
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

            {orderNum && (
              <Box fontSize="lg">
                Order ID:{" "}
                <Text className="font-palanquin" color={"gray.500"}>
                  {orderNum}
                </Text>
              </Box>
            )}
            {trackId && (
              <Text fontSize="sm" color="gray.400">
                Track ID: {trackId}
              </Text>
            )}
            <Button
              colorScheme="orange"
              onClick={() => {
                navigate(`/orders/${id}`);
                localStorage.removeItem("latestOrderId");
              }}
            >
              View Order Detail
            </Button>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default PaymentResult;
