import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  VStack,
  Button,
  Divider,
  Text,
  HStack,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  useToast,
  Spinner,
  Stack,
  Image,
} from "@chakra-ui/react";
import { useCart } from "../context/CartProvider";
import { createOrder } from "../services/userServices";
import { useAuth } from "../context/AuthProvider";
import api from "../services/api";

const initialShipping = {
  name: "",
  address: "",
  phone: "",
  city: "",
  postalCode: "",
  country: "",
};

const CheckoutPage = () => {
  const {
    cart,
    removeFromCart,
    clearCart,
    subtotal,
    totalDiscount,
    tax,
    total,
    taxAmount,
  } = useCart();

  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState(initialShipping);
  const [shippingError, setShippingError] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [isPlacing, setIsPlacing] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const toast = useToast();
  const [products, setProducts] = useState([]);
  const { user } = useAuth();

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

  // Step 1: Review Cart
  const cartItems = cart?.items || [];

  // Step 2: Shipping validation
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

  // Step 3: Place order
  const handlePlaceOrder = async () => {
    setIsPlacing(true);
    try {
      const orderData = {
        items: cartItems.map((item) => ({
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
      const res = await createOrder(orderData);
      setOrderId(res._id || res.id);
      localStorage.setItem("latestOrderId", res._id);

      if (paymentMethod === "Card") {
        const res = await api.post("/pay/zibal/request", {
          amount: total,
          orderId,
          callbackUrl: `http://localhost:5173/payment-result`,
        });

        window.location.href = res.data.paymentUrl;
      }

      if (clearCart) clearCart();
      setStep(4);
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

  return (
    <Box maxW="600px" mx="auto" mt={8} p={4}>
      <Heading size="lg" mb={6}>
        Checkout
      </Heading>
      <VStack align="stretch" spacing={6}>
        {step === 1 && (
          <Box>
            <Heading size="md" mb={2}>
              Review Cart
            </Heading>
            {cartItems.length === 0 ? (
              <Text>Your cart is empty.</Text>
            ) : (
              <VStack align="stretch" spacing={3}>
                {console.log(cartItems)}
                {cartItems.map((item) => {
                  const product = item.productId;

                  return (
                    <HStack
                      key={item._id || product._id}
                      justify="space-between"
                      align="center"
                      p={2}
                      borderWidth={1}
                      borderRadius="md"
                    >
                      <HStack>
                        {product.imageUrl.length && (
                          <Image
                            src={product.imageUrl[0]}
                            alt={product.name}
                            boxSize="50px"
                            objectFit="cover"
                            borderRadius="md"
                          />
                        )}
                        <Box>
                          <Text fontWeight="bold">{product.name}</Text>
                          <Text fontSize="sm">x{item.quantity}</Text>
                        </Box>
                      </HStack>
                      <HStack>
                        <Text>
                          ${(product.price * item.quantity).toFixed(2)}
                        </Text>
                        <Button
                          size="sm"
                          colorScheme="red"
                          variant="outline"
                          onClick={() =>
                            removeFromCart(item._id || product._id)
                          }
                        >
                          Remove
                        </Button>
                      </HStack>
                    </HStack>
                  );
                })}
                <HStack justify="space-between" pt={2}>
                  <Text fontWeight="bold">Subtotal:</Text>
                  <Text fontWeight="bold">${subtotal.toFixed(2)}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text>Discount:</Text>
                  <Text color="red.500">-${totalDiscount.toFixed(2)}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text>Tax ({taxAmount}%):</Text>
                  <Text>${tax.toFixed(2)}</Text>
                </HStack>
                <HStack justify="space-between" fontWeight="bold">
                  <Text fontWeight="bold">Total:</Text>
                  <Text fontWeight="bold">${total.toFixed(2)}</Text>
                </HStack>
                <Button
                  colorScheme="orange"
                  mt={4}
                  onClick={() => setStep(2)}
                  isDisabled={cartItems.length === 0}
                >
                  Next: Shipping Info
                </Button>
              </VStack>
            )}
          </Box>
        )}

        {step === 2 && (
          <Box
            as="form"
            onSubmit={(e) => {
              e.preventDefault();
              if (validateShipping()) setStep(3);
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
              <Button variant="ghost" mt={2} onClick={() => setStep(1)}>
                Back to Cart
              </Button>
            </Stack>
          </Box>
        )}
        {step === 3 && (
          <Box>
            <Heading size="md" mb={2}>
              Payment
            </Heading>
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
            {/* Optionally add card details fields here if paymentMethod === 'Card' */}
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
            <Button variant="ghost" mt={2} onClick={() => setStep(2)}>
              Back to Shipping
            </Button>
          </Box>
        )}
        {step === 4 && (
          <Box textAlign="center">
            <Heading size="md" mb={2}>
              Order Placed!
            </Heading>
            <Text mb={2}>Thank you for your purchase.</Text>
            {orderId && <Text fontWeight="bold">Order ID: {orderId}</Text>}
            <Button colorScheme="blue" mt={4} onClick={() => setStep(1)}>
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
