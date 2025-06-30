import { useState } from "react";
import { Box, Heading, VStack, Button, Divider } from "@chakra-ui/react";

const CheckoutPage = () => {
  // Step 1: Review cart (to be implemented)
  // Step 2: Shipping info (to be implemented)
  // Step 3: Payment (to be implemented)
  const [step, setStep] = useState(1);

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
            {/* TODO: List cart items here */}
            <Button colorScheme="blue" mt={4} onClick={() => setStep(2)}>
              Next: Shipping Info
            </Button>
          </Box>
        )}
        {step === 2 && (
          <Box>
            <Heading size="md" mb={2}>
              Shipping Information
            </Heading>
            {/* TODO: Shipping form here */}
            <Button colorScheme="blue" mt={4} onClick={() => setStep(3)}>
              Next: Payment
            </Button>
          </Box>
        )}
        {step === 3 && (
          <Box>
            <Heading size="md" mb={2}>
              Payment
            </Heading>
            {/* TODO: Payment form here */}
            <Button colorScheme="green" mt={4} onClick={() => setStep(4)}>
              Place Order
            </Button>
          </Box>
        )}
        {step === 4 && (
          <Box>
            <Heading size="md" mb={2}>
              Order Placed!
            </Heading>
            {/* TODO: Show order confirmation */}
          </Box>
        )}
      </VStack>
      <Divider mt={8} />
    </Box>
  );
};

export default CheckoutPage;
