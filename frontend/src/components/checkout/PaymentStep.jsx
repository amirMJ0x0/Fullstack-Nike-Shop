import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Divider,
  FormControl,
  FormLabel,
  Select,
  Button,
  Flex,
} from "@chakra-ui/react";

const PaymentStep = ({
  subtotal,
  totalDiscount,
  tax,
  total,
  paymentMethod,
  setPaymentMethod,
  handlePlaceOrder,
  isPlacing,
  onBack,
  isCartEmpty,
}) => {
  return (
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
          <Text className="text-red-500">-${totalDiscount.toFixed(2)}</Text>
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
          isDisabled={isCartEmpty}
        >
          Place Order
        </Button>
        <Button variant="ghost" mt={4} onClick={onBack}>
          Back to Shipping
        </Button>
      </Flex>
    </Box>
  );
};

export default PaymentStep;
