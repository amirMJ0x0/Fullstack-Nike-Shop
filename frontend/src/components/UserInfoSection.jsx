import { useEffect, useState } from "react";
import {
  Button,
  HStack,
  Text,
  VStack,
  Input,
  FormControl,
  FormLabel,
  useToast,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { FiEdit3, FiX, FiUser } from "react-icons/fi";
import { updateUserProfile } from "../services/userServices";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { PhoneInput } from "./share/CustomPhoneInput";

const UserInfoSection = ({
  fullName,
  phone,
  address,
  city,
  postalCode,
  country,
  refetch,
}) => {
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    fullName,
    phone,
    address,
    city,
    postalCode,
    country,
  });
  useEffect(() => {
    setForm({
      fullName,
      phone,
      address,
      city,
      postalCode,
      country,
    });
  }, [fullName, phone, address, city, postalCode, country]);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (val) => {
    setForm((prev) => ({ ...prev, country: val, city: "" }));
  };

  const handleCityChange = (val) => {
    setForm((prev) => ({ ...prev, city: val }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateUserProfile(form);
      toast({
        title: "Success",
        description: "Profile info updated successfully",
        status: "success",
        duration: 3000,
        position: "top-right",
      });
      setIsEditing(false);
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile info",
        status: "error",
        duration: 3000,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setForm({ fullName, phone, address, city, postalCode, country });
  };

  return (
    <VStack align={"flex-start"} gap={2} w="full">
      <HStack w="full" justify="space-between">
        <HStack>
          <Text fontWeight="medium">Profile Info</Text>
          <Box color="gray.500">
            <FiUser />
          </Box>
        </HStack>
        {!isEditing && (
          <IconButton
            icon={<FiEdit3 />}
            variant="ghost"
            colorScheme="orange"
            size="sm"
            onClick={() => setIsEditing(true)}
            _hover={{ bg: "transparent", color: "coral" }}
          />
        )}
      </HStack>
      {isEditing ? (
        <VStack
          align="flex-start"
          gap={3}
          w="full"
          p={4}
          bg="gray.50"
          borderRadius="md"
          _dark={{ bgColor: "gray.900" }}
        >
          <FormControl>
            <FormLabel fontSize="sm">Full Name</FormLabel>
            <Input
              name="fullName"
              value={form.fullName || ""}
              onChange={handleChange}
              size="md"
              focusBorderColor="coral"
            />
          </FormControl>
          <FormControl zIndex={1000}>
            <FormLabel fontSize="sm">Phone</FormLabel>
            <PhoneInput
              value={form.phone}
              onChange={(val) => setForm((prev) => ({ ...prev, phone: val }))}
              error={phoneError}
              setError={setPhoneError}
            />
            {phoneError && <Text color="red.400">{phoneError}</Text>}
          </FormControl>
          <FormControl>
            <FormLabel fontSize="sm">Address</FormLabel>
            <Input
              name="address"
              value={form.address || ""}
              onChange={handleChange}
              size="md"
              focusBorderColor="coral"
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="sm">Country</FormLabel>
            <CountryDropdown
              value={form.country || ""}
              onChange={handleCountryChange}
              classes="chakra-input css-1c6xsvs"
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #E2E8F0",
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="sm">City</FormLabel>
            <RegionDropdown
              country={form.country || ""}
              value={form.city || ""}
              onChange={handleCityChange}
              classes="chakra-input css-1c6xsvs"
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #E2E8F0",
              }}
              blankOptionLabel="Select country first"
              defaultOptionLabel="Select city"
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="sm">Postal Code</FormLabel>
            <Input
              name="postalCode"
              value={form.postalCode || ""}
              onChange={handleChange}
              size="md"
              focusBorderColor="coral"
            />
          </FormControl>
          <HStack>
            <Button
              size="sm"
              colorScheme="orange"
              onClick={handleSave}
              isLoading={isLoading}
            >
              Save
            </Button>
            <IconButton
              icon={<FiX />}
              size="sm"
              onClick={handleCancel}
              variant="ghost"
            />
          </HStack>
        </VStack>
      ) : (
        <VStack align="flex-start" gap={1} w="full" pl={2}>
          <Text>
            <b>Full Name:</b>{" "}
            {fullName || <span style={{ color: "#aaa" }}>Not set</span>}
          </Text>
          <Text>
            <b>Phone:</b>{" "}
            {phone || <span style={{ color: "#aaa" }}>Not set</span>}
          </Text>
          x
          <Text>
            <b>Postal Code:</b>{" "}
            {postalCode || <span style={{ color: "#aaa" }}>Not set</span>}
          </Text>
          <Text>
            <b>Country:</b>{" "}
            {country || <span style={{ color: "#aaa" }}>Not set</span>}
          </Text>
          <Text>
            <b>City:</b>{" "}
            {city || <span style={{ color: "#aaa" }}>Not set</span>}
          </Text>
          <Text>
            <b>Address:</b>{" "}
            {address || <span style={{ color: "#aaa" }}>Not set</span>}
          </Text>
        </VStack>
      )}
    </VStack>
  );
};

export default UserInfoSection;
