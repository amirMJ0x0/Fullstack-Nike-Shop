import { useState } from "react";
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
import { FiShield, FiX } from "react-icons/fi";
import { changePassword } from "../services/userServices";

const PasswordSection = ({ refetch }) => {
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        position: "top-right",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        status: "error",
        duration: 3000,
        position: "top-right",
      });
      return;
    }
    setIsLoading(true);
    try {
      await changePassword(oldPassword, newPassword);
      toast({
        title: "Success",
        description: "Password changed successfully",
        status: "success",
        duration: 3000,
        position: "top-right",
      });
      setIsEditing(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to change password",
        status: "error",
        duration: 3000,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <VStack align={"flex-start"} gap={2} w="full">
      <HStack w="full" justify="space-between">
        <HStack>
          <Text fontWeight="bold">Password</Text>
          <Box color="gray.500">
            <FiShield />
          </Box>
        </HStack>
        {!isEditing && (
          <Button
            variant="ghost"
            colorScheme="orange"
            size="sm"
            onClick={() => setIsEditing(true)}
            _hover={{ bg: "transparent", color: "coral" }}
          >
            Change Password
          </Button>
        )}
      </HStack>
      {isEditing && (
        <VStack
          align="flex-start"
          gap={3}
          w="full"
          p={4}
          bg="gray.50"
          borderRadius="md"
          _dark={{ bg: "gray.900" }}
        >
          <FormControl>
            <FormLabel fontSize="sm">Current Password</FormLabel>
            <Input
              type="password"
              value={oldPassword}
              focusBorderColor="coral"
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter your current password"
              size="sm"
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="sm">New Password</FormLabel>
            <Input
              type="password"
              focusBorderColor="coral"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              size="sm"
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="sm">Confirm New Password</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              focusBorderColor="coral"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              size="sm"
            />
          </FormControl>
          <HStack>
            <Button
              size="sm"
              colorScheme="orange"
              onClick={handlePasswordChange}
              isLoading={isLoading}
            >
              Change Password
            </Button>
            <IconButton
              icon={<FiX />}
              size="sm"
              onClick={cancelEdit}
              variant="ghost"
            />
          </HStack>
        </VStack>
      )}
    </VStack>
  );
};

export default PasswordSection;
