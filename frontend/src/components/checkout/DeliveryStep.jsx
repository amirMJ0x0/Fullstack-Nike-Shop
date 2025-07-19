import {
  Box,
  Button,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DeliveryStep = ({ deliveryDate, setDeliveryDate, onNext, onBack }) => {
  const toast = useToast();
  return (
    <VStack spacing={4} alignItems={"stretch"}>
      <Heading size={"md"} mb={"2"}>
        Choose Delivery Date
      </Heading>
      <DatePicker
        customInput={<Input focusBorderColor="coral" required={true} />}
        selected={deliveryDate}
        onChange={(date) => setDeliveryDate(date)}
        minDate={new Date(Date.now() + 1000 * 60 * 60 * 24 * 2)}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select delivery date"
        required={true}
      />

      <Box>
        <Button
          colorScheme="orange"
          mt={2}
          type="button"
          onClick={() => {
            if (deliveryDate) onNext();
            else {
              toast({
                title: "Please select a delivery date",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top-right",
                colorScheme: "red",
              });
            }
          }}
        >
          Next: Payment
        </Button>
        <Button variant="ghost" mt={2} onClick={onBack}>
          Back to Shipping Info
        </Button>
      </Box>
    </VStack>
  );
};
export default DeliveryStep;
