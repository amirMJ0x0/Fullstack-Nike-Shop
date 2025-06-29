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
import { FiEdit3, FiX, FiUser } from "react-icons/fi";
import { editUsername } from "../services/userServices";

const UsernameSection = ({ username, refetch }) => {
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = async () => {
    if (!newUsername) {
      toast({
        title: "Error",
        description: "Please enter a new username",
        status: "error",
        duration: 3000,
        position: "top-right",
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
      setIsEditing(false);
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

  const cancelEdit = () => {
    setIsEditing(false);
    setNewUsername("");
  };

  return (
    <VStack align={"flex-start"} gap={2} w="full">
      <HStack w="full" justify="space-between">
        <HStack>
          <Text fontWeight="medium">
            Username: <span className="font-bold">{username}</span>
          </Text>
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
          <FormControl>
            <FormLabel fontSize="sm">New Username</FormLabel>
            <Input
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Enter new username"
              size="sm"
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
              onClick={cancelEdit}
              variant="ghost"
            />
          </HStack>
        </VStack>
      )}
    </VStack>
  );
};

export default UsernameSection;
