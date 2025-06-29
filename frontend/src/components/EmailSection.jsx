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
import { FiEdit3, FiX, FiMail } from "react-icons/fi";
import {
  initiateEmailChange,
  verifyEmailChange,
} from "../services/userServices";

const EmailSection = ({ email, isVerified, refetch }) => {
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [currentEmailForVerification, setCurrentEmailForVerification] =
    useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInitiateEmailChange = async () => {
    if (!newEmail || !currentPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        position: "top-right",
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await initiateEmailChange(newEmail, currentPassword);
      setCurrentEmailForVerification(response.email);
      setIsVerifying(true);
      toast({
        title: "Success",
        description: "Verification code sent to your current email",
        status: "success",
        duration: 3000,
        position: "top-right",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to initiate email change",
        status: "error",
        duration: 3000,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmailChange = async () => {
    if (!verificationCode) {
      toast({
        title: "Error",
        description: "Please enter the verification code",
        status: "error",
        duration: 3000,
        position: "top-right",
      });
      return;
    }
    setIsLoading(true);
    try {
      await verifyEmailChange(verificationCode);
      toast({
        title: "Success",
        description:
          "Email changed successfully! Please verify your new email.",
        status: "success",
        duration: 3000,
        position: "top-right",
      });
      setIsEditing(false);
      setIsVerifying(false);
      setNewEmail("");
      setCurrentPassword("");
      setVerificationCode("");
      setCurrentEmailForVerification("");
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to verify email change",
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
    setIsVerifying(false);
    setNewEmail("");
    setCurrentPassword("");
    setVerificationCode("");
    setCurrentEmailForVerification("");
  };

  return (
    <VStack align={"flex-start"} gap={2} w="full">
      <HStack w="full" justify="space-between">
        <HStack>
          <Text fontWeight="medium">
            Email: <span className="font-bold">{email}</span>
          </Text>
          {isVerified ? (
            <Box color="green.500" title="Email verified">
              <FiMail />
            </Box>
          ) : (
            <Box color="red.500" title="Email not verified">
              <FiMail />
            </Box>
          )}
        </HStack>
        {!isEditing && (
          <IconButton
            icon={<FiEdit3 />}
            colorScheme="orange"
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            _hover={{ bg: "transparent", color: "coral" }}
          />
        )}
      </HStack>
      {isEditing && (
        <VStack
          align="flex-start"
          gap={3}
          w="full"
          p={4}
          bg="gray.50"
          _dark={{ bg: "gray.900" }}
          borderRadius="md"
        >
          {!isVerifying ? (
            <>
              <FormControl>
                <FormLabel fontSize="sm">Password</FormLabel>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter your password"
                  size="sm"
                  focusBorderColor="coral"
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">New Email</FormLabel>
                <Input
                  type="email"
                  value={newEmail}
                  focusBorderColor="coral"
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter new email address"
                  size="sm"
                />
              </FormControl>
              <HStack>
                <Button
                  size="sm"
                  colorScheme="orange"
                  onClick={handleInitiateEmailChange}
                  isLoading={isLoading}
                >
                  Send Verification Code
                </Button>
                <IconButton
                  icon={<FiX />}
                  size="sm"
                  onClick={cancelEdit}
                  variant="ghost"
                />
              </HStack>
            </>
          ) : (
            <>
              <Text fontSize="sm" color="gray.600">
                Verification code sent to:{" "}
                <strong>{currentEmailForVerification}</strong>
              </Text>
              <FormControl>
                <FormLabel fontSize="sm">Verification Code</FormLabel>
                <Input
                  value={verificationCode}
                  focusBorderColor="coral"
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  size="sm"
                  maxLength={6}
                />
              </FormControl>
              <HStack>
                <Button
                  size="sm"
                  colorScheme="green"
                  onClick={handleVerifyEmailChange}
                  isLoading={isLoading}
                >
                  Verify & Change Email
                </Button>
                <IconButton
                  icon={<FiX />}
                  size="sm"
                  onClick={cancelEdit}
                  variant="ghost"
                />
              </HStack>
            </>
          )}
        </VStack>
      )}
    </VStack>
  );
};

export default EmailSection;
