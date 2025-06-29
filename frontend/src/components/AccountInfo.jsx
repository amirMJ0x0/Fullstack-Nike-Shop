import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  getUserProfile,
  initiateEmailChange,
  verifyEmailChange,
  changePassword,
  editUsername,
} from "../services/userServices";
import {
  Button,
  HStack,
  Text,
  VStack,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
  Box,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { FiEdit3, FiCheck, FiX, FiShield, FiUser } from "react-icons/fi";
import { RiMailCheckFill, RiMailCloseFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const AccountInfo = () => {
  const { data, refetch } = useQuery({
    queryKey: ["accountInfo"],
    queryFn: getUserProfile,
  });

  const toast = useToast();
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);

  // Username change states
  const [newUsername, setNewUsername] = useState("");

  // Email change states
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [currentEmailForVerification, setCurrentEmailForVerification] =
    useState("");

  // Password change states
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Loading states
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = async () => {
    if (!newUsername) {
      toast({
        title: "Error",
        description: "Please enter a new username",
        status: "error",
        duration: 3000,
        position: "top-left",
      });
      return;
    }

    setIsLoading(true);
    try {
      await editUsername(newUsername);
      toast({
        title: "Success",
        description: "Username changed successfully",
        status: "success",
        duration: 3000,
        position: "top-right",
      });
      setIsEditingUsername(false);
      setNewUsername("");
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to change username",
        status: "error",
        duration: 3000,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cancelUsernameEdit = () => {
    setIsEditingUsername(false);
    setNewUsername("");
  };

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
      setIsVerifyingEmail(true);
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
      setIsEditingEmail(false);
      setIsVerifyingEmail(false);
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
      setIsEditingPassword(false);
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

  const cancelEmailEdit = () => {
    setIsEditingEmail(false);
    setIsVerifyingEmail(false);
    setNewEmail("");
    setCurrentPassword("");
    setVerificationCode("");
    setCurrentEmailForVerification("");
  };

  const cancelPasswordEdit = () => {
    setIsEditingPassword(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <VStack align={"flex-start"} gap={4} w="full">
      {/* Username Section */}
      <VStack align={"flex-start"} gap={2} w="full">
        <HStack w="full" justify="space-between">
          <HStack>
            <Text fontWeight="light">
              Username: <span className="font-bold">{data?.username}</span>
            </Text>
            <Box color="gray.500">
              <FiUser />
            </Box>
          </HStack>
          {!isEditingUsername && (
            <IconButton
              icon={<FiEdit3 />}
              variant="ghost"
              colorScheme="orange"
              size="sm"
              onClick={() => setIsEditingUsername(true)}
              _hover={{ bg: "transparent", color: "coral" }}
            />
          )}
        </HStack>

        {/* Username Edit Form */}
        {isEditingUsername && (
          <VStack
            align="flex-start"
            gap={3}
            w="full"
            p={4}
            bg="gray.50"
            borderRadius="md"
          >
            <FormControl>
              <FormLabel fontSize="sm">New Username</FormLabel>
              <Input
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Enter new username"
                size="sm"
                // borderColor="orange"
                focusBorderColor="coral"
              />
            </FormControl>
            <HStack>
              <Button
                size="sm"
                colorScheme="orange"
                onClick={handleUsernameChange}
                isLoading={isLoading}
              >
                Change Username
              </Button>
              <IconButton
                icon={<FiX />}
                size="sm"
                onClick={cancelUsernameEdit}
                variant="ghost"
              />
            </HStack>
          </VStack>
        )}
      </VStack>
      <Divider />

      {/* Email Section */}
      <VStack align={"flex-start"} gap={2} w="full">
        <HStack w="full" justify="space-between">
          <HStack>
            <Text fontWeight="light">
              Email: <span className="font-bold">{data?.email}</span>
            </Text>
            {data?.isVerified ? (
              <Box color="green.500" title="Email verified">
                <RiMailCheckFill />
              </Box>
            ) : (
              <Link
                to={"/verify-email"}
                onClick={() =>
                  // send verification email to current email
                  null
                }
                className="!text-red-500"
                title="Email not verified!"
              >
                <RiMailCloseFill />
              </Link>
            )}
          </HStack>
          {!isEditingEmail && (
            <IconButton
              icon={<FiEdit3 />}
              variant="ghost"
              colorScheme="orange"
              size="sm"
              onClick={() => setIsEditingEmail(true)}
              _hover={{ bg: "transparent", color: "coral" }}
            />
          )}
        </HStack>

        {/* Email Edit Form */}
        {isEditingEmail && (
          <VStack
            align="flex-start"
            gap={3}
            w="full"
            p={4}
            bg="gray.50"
            borderRadius="md"
          >
            {!isVerifyingEmail ? (
              <>
                <FormControl>
                  <FormLabel fontSize="sm">Current Password</FormLabel>
                  <Input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter your current password"
                    size="sm"
                    focusBorderColor="coral"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="sm">New Email</FormLabel>
                  <Input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    focusBorderColor="coral"
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
                    onClick={cancelEmailEdit}
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
                    onClick={cancelEmailEdit}
                    variant="ghost"
                  />
                </HStack>
              </>
            )}
          </VStack>
        )}
      </VStack>
      <Divider />

      {/* Password Section */}
      <VStack align={"flex-start"} gap={2} w="full">
        <HStack w="full" justify="space-between">
          <HStack>
            <Text fontWeight="light">Password</Text>
            <Box color="gray.500">
              <FiShield />
            </Box>
          </HStack>
          {!isEditingPassword && (
            <Button
              variant="ghost"
              colorScheme="orange"
              size="sm"
              onClick={() => setIsEditingPassword(true)}
              _hover={{ bg: "transparent", color: "coral" }}
            >
              Change Password
            </Button>
          )}
        </HStack>

        {/* Password Edit Form */}
        {isEditingPassword && (
          <VStack
            align="flex-start"
            gap={3}
            w="full"
            p={4}
            bg="gray.50"
            borderRadius="md"
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
                value={newPassword}
                focusBorderColor="coral"
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
                onClick={cancelPasswordEdit}
                variant="ghost"
              />
            </HStack>
          </VStack>
        )}
      </VStack>
    </VStack>
  );
};

export default AccountInfo;
