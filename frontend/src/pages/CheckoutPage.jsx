import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  VStack,
  Divider,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_REACT_APP_URL;

import { useCart } from "../context/CartProvider";
import { useAuth } from "../context/AuthProvider";
import { createOrder } from "../services/userServices";
import api from "../services/api";
import EmptyList from "../components/share/EmptyList";
import ShippingForm from "../components/checkout/ShippingForm";
import DeliveryStep from "../components/checkout/DeliveryStep";
import PaymentStep from "../components/checkout/PaymentStep";
import SuccessMessage from "../components/checkout/SuccessMessage";
import { scrollTo } from "../utils/scrollToTop";

const initialShipping = {
  name: "",
  address: "",
  phone: "",
  city: "",
  postalCode: "",
  country: "",
};

const CheckoutPage = () => {
  const { cart, subtotal, totalDiscount, tax, total, clearCart } = useCart();
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState("shipping"); // shipping → delivery → payment → done
  const [shipping, setShipping] = useState(initialShipping);
  const [shippingError, setShippingError] = useState({});
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [isPlacing, setIsPlacing] = useState(false);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    scrollTo();
  }, [step]);

  useEffect(() => {
    if (user) {
      setShipping({
        name: user.fullName || "",
        address: user.address || "",
        phone: user.phone || "",
        postalCode: user.postalCode || "",
        country: user.country || "",
        city: user.city || "",
      });
    }
  }, [user]);

  const validateShipping = () => {
    const errors = {};
    if (!shipping.name) errors.name = "Name is required";
    if (!shipping.address) errors.address = "Address is required";
    if (!shipping.phone) errors.phone = "Phone is required";
    else if (!/^\d{10,15}$/.test(shipping.phone.replace(/\D/g, "")))
      errors.phone = "Enter a valid phone number";
    setShippingError(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async () => {
    setIsPlacing(true);
    try {
      const orderData = {
        items: cart?.items.map((item) => ({
          product: item.productId?._id,
          quantity: item.quantity,
        })),
        shippingInfo: {
          address: shipping.address,
          city: shipping.city,
          postalCode: shipping.postalCode,
          country: shipping.country,
        },
        deliveryDate,
        total,
        paymentInfo: {
          method: paymentMethod,
        },
      };
      const orderRes = await createOrder(orderData);
      const createdOrderId = orderRes.orderNumber;
      localStorage.setItem(
        "latestOrderId",
        JSON.stringify({
          orderNum: createdOrderId,
          id: orderRes._id,
        })
      );
      setOrderId(createdOrderId);

      if (paymentMethod === "Card") {
        const zibalRes = await api.post("/pay/zibal/request", {
          amount: total,
          orderId: createdOrderId,
          callbackUrl: `${baseUrl}/payment-result`,
        });
        window.location.href = zibalRes.data.paymentUrl;

        return;
      }

      clearCart();
      setStep("done");
    } catch (err) {
      toast({
        title: "Order failed",
        description: err?.response?.data?.message || err.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsPlacing(false);
    }
  };

  if (!cart || !Array.isArray(cart.items)) {
    return <Spinner size="xl" />;
  }

  if (step === "shipping" && cart.items.length === 0) {
    return <EmptyList message="Your cart is empty." />;
  }

  return (
    <Box maxW="600px" className="!padding-x" mx="auto" mb={"36"} mt={"6"}>
      <Helmet>
        <title>Nike - Checkout</title>
      </Helmet>
      <Heading size="lg" mb={6}>
        Checkout
      </Heading>
      <VStack align="stretch" spacing={6}>
        {step === "shipping" && (
          <ShippingForm
            shipping={shipping}
            setShipping={setShipping}
            shippingError={shippingError}
            validateShipping={validateShipping}
            onBack={() => navigate("/cart")}
            onNext={() => setStep("delivery")}
          />
        )}
        {step === "delivery" && (
          <DeliveryStep
            deliveryDate={deliveryDate}
            setDeliveryDate={setDeliveryDate}
            onBack={() => setStep("shipping")}
            onNext={() => setStep("payment")}
          />
        )}
        {step === "payment" && (
          <PaymentStep
            subtotal={subtotal}
            totalDiscount={totalDiscount}
            tax={tax}
            total={total}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            handlePlaceOrder={handlePlaceOrder}
            isPlacing={isPlacing}
            isCartEmpty={cart.items.length === 0}
            onBack={() => setStep("shipping")}
          />
        )}
        {step === "done" && <SuccessMessage orderId={orderId} />}
      </VStack>
      <Divider mt={8} />
    </Box>
  );
};

export default CheckoutPage;
