import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Stack,
  Box,
  Heading
} from "@chakra-ui/react";

const ShippingForm = ({
  shipping,
  setShipping,
  shippingError,
  validateShipping,
  onNext,
  onBack,
}) => {
  return (
    <Box
      as="form"
      onSubmit={(e) => {
        e.preventDefault();
        if (validateShipping()) onNext();
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
            onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
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
            onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
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
          Next: Select Deliver Date
        </Button>
        <Button variant="ghost" mt={2} onClick={onBack}>
          Back to Cart
        </Button>
      </Stack>
    </Box>
  );
};

export default ShippingForm;
