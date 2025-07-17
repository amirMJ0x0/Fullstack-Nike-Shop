import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Heading,
  VStack,
  Button,
  Divider,
  Text,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  useToast,
  Spinner,
  Stack,
  Flex,
  HStack,
} from "@chakra-ui/react";
const baseUrl = import.meta.env.VITE_REACT_APP_URL;
import { useCart } from "../context/CartProvider";
import { createOrder } from "../services/userServices";
import { useAuth } from "../context/AuthProvider";
import api from "../services/api";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import EmptyList from "../components/share/EmptyList";
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
  const { cart, clearCart, subtotal, totalDiscount, tax, total, taxRate } =
    useCart();
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState(initialShipping);
  const [shippingError, setShippingError] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [isPlacing, setIsPlacing] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const toast = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

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

  // Step 1: Shipping validation
  const validateShipping = () => {
    const errors = {};
    if (!shipping.name) errors.name = "Name is required";
    if (!shipping.address) errors.address = "Address is required";
    if (!shipping.phone) errors.phone = "Phone is required";
    else if (!/^\d{10,15}$/.test(shipping.phone.replace(/\D/g, "")))
      errors.phone = "Enter a valid phone number";
    setShippingError(errors);
    return Object.keys(errors)?.length === 0;
  };

  // Step 2: Place order
  const handlePlaceOrder = async () => {
    setIsPlacing(true);
    try {
      const orderData = {
        items: cart?.items.map((item) => ({
          product: item.product?._id || item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        shippingInfo: {
          address: shipping.address,
          city: shipping.city,
          postalCode: shipping.postalCode,
          country: shipping.country,
        },
        total,
        paymentInfo: {
          method: paymentMethod,
        },
      };

      const orderRes = await createOrder(orderData);
      const createdOrderId = orderRes.orderNumber;
      localStorage.setItem("latestOrderId", createdOrderId);
      setOrderId(localStorage.getItem("latestOrderId") || createdOrderId);
      if (paymentMethod === "Card") {
        const zibalRes = await api.post("/pay/zibal/request", {
          amount: total,
          orderId: createdOrderId,
          callbackUrl: `${baseUrl}/payment-result`,
        });

        window.location.href = zibalRes.data.paymentUrl;
        return;
      }

      if (clearCart) clearCart();
      setStep(3);
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
  if (step === 1 && cart?.items.length === 0) {
    return <EmptyList message={"Your cart is empty."} />;
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
        {step === 1 && (
          <Box
            as="form"
            onSubmit={(e) => {
              e.preventDefault();
              if (validateShipping()) setStep(2);
            }}
          >
            <Heading size="md" mb={2}>
              Shipping Information
            </Heading>
            <Stack spacing={4}>
              <FormControl isInvalid={!!shippingError.name} isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  value={shipping.name}
                  onChange={(e) =>
                    setShipping({ ...shipping, name: e.target.value })
                  }
                  placeholder="Full Name"
                  focusBorderColor="coral"
                />
                <FormErrorMessage>{shippingError.name}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!shippingError.address} isRequired>
                <FormLabel>Address</FormLabel>
                <Input
                  value={shipping.address}
                  onChange={(e) =>
                    setShipping({ ...shipping, address: e.target.value })
                  }
                  placeholder="Shipping Address"
                  focusBorderColor="coral"
                />
                <FormErrorMessage>{shippingError.address}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!shippingError.phone} isRequired>
                <FormLabel>Phone</FormLabel>
                <Input
                  value={shipping.phone}
                  onChange={(e) =>
                    setShipping({ ...shipping, phone: e.target.value })
                  }
                  placeholder="Phone Number"
                  type="tel"
                  focusBorderColor="coral"
                />
                <FormErrorMessage>{shippingError.phone}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>City</FormLabel>
                <Input
                  value={shipping.city}
                  onChange={(e) =>
                    setShipping({ ...shipping, city: e.target.value })
                  }
                  placeholder="City"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Postal Code</FormLabel>
                <Input
                  value={shipping.postalCode}
                  onChange={(e) =>
                    setShipping({ ...shipping, postalCode: e.target.value })
                  }
                  placeholder="Postal Code"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Country</FormLabel>
                <Input
                  value={shipping.country}
                  onChange={(e) =>
                    setShipping({ ...shipping, country: e.target.value })
                  }
                  placeholder="Country"
                />
              </FormControl>

              <Button colorScheme="orange" mt={2} type="submit">
                Next: Payment
              </Button>
              <Button variant="ghost" mt={2} onClick={() => navigate("/cart")}>
                Back to Cart
              </Button>
            </Stack>
          </Box>
        )}
        {step === 2 && (
          <Box>
            <Heading size="md" mb={2}>
              Payment
            </Heading>
            <VStack align="stretch" mb={4}>
              <HStack justify="space-between">
                <Text>Subtotal:</Text>
                <Text>${subtotal.toFixed(2)}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text>Discount:</Text>
                <Text className="text-red-500">
                  -${totalDiscount.toFixed(2)}
                </Text>
              </HStack>
              <HStack justify="space-between">
                <Text>Tax (2%):</Text>
                <Text>${tax.toFixed(2)}</Text>
              </HStack>
              <Divider />
              <HStack justify="space-between" fontWeight="bold">
                <Text>Total:</Text>
                <Text>${total.toFixed(2)}</Text>
              </HStack>
            </VStack>

            <FormControl mb={4}>
              <FormLabel>Payment Method</FormLabel>
              <Select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                focusBorderColor="coral"
              >
                <option value="Card">Card (Demo)</option>
                <option value="Cash">Cash on Delivery</option>
              </Select>
            </FormControl>
            <Flex>
              <Button
                colorScheme="green"
                mt={4}
                onClick={handlePlaceOrder}
                isLoading={isPlacing}
                loadingText="Placing Order..."
                isDisabled={cart.length === 0}
              >
                Place Order
              </Button>
              <Button variant="ghost" mt={4} onClick={() => setStep(2)}>
                Back to Shipping
              </Button>
            </Flex>
          </Box>
        )}
        {step === 3 && (
          <Box textAlign="center">
            <Heading size="md" mb={2}>
              Order Placed!
            </Heading>
            <Text mb={2}>Thank you for your purchase.</Text>
            {orderId && <Text fontWeight="bold">Order ID: {orderId}</Text>}
            <Button
              colorScheme="blue"
              mt={4}
              onClick={() => navigate("/products")}
            >
              Shop More
            </Button>
          </Box>
        )}
      </VStack>
      <Divider mt={8} />
    </Box>
  );
};

export default CheckoutPage;
