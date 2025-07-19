import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SuccessMessage = ({ orderId }) => {
  const navigate = useNavigate();
  return (
    <Box textAlign="center">
      <Heading size="md" mb={2}>
        Order Placed!
      </Heading>
      <Text mb={2}>Thank you for your purchase.</Text>
      {orderId && <Text fontWeight="bold">Order ID: {orderId}</Text>}
      <Button colorScheme="blue" mt={4} onClick={() => navigate("/products")}>
        Shop More
      </Button>
    </Box>
  );
};

export default SuccessMessage;
