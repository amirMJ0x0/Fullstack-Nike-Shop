import { useState } from "react";
import { Input, Button, useToast, Text } from "@chakra-ui/react";
import { FiEdit3 } from "react-icons/fi";
import CustomModal from "./share/CustomModal";
import useModal from "../hooks/useModal";
import { editUsername } from "../services/userServices";

const EditUsernameModal = ({ currentUsername, onSuccess }) => {
  const modal = useModal();
  const [username, setUsername] = useState(currentUsername || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();

  const handleConfirm = async () => {
    setLoading(true);
    setError("");
    try {
      await editUsername(username); // sending req
      toast({
        title: "Username updated!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      modal.close();
      if (onSuccess) onSuccess(username);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update username.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        _hover={{ bg: "transparent", color: "coral" }}
        onClick={modal.open}
        size={{ base: "sm", md: "md" }}
        className="!px-1 !text-coral-red"
      >
        <FiEdit3 />
      </Button>
      <CustomModal
        isOpen={modal.isOpen}
        onClose={modal.close}
        onConfirm={handleConfirm}
        title="Edit Username"
        confirmText={loading ? "Saving..." : "Save"}
      >
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter new username"
          isDisabled={loading}
        />
        {error && (
          <Text color="red.500" fontSize="sm" mt={2}>
            {error}
          </Text>
        )}
      </CustomModal>
    </>
  );
};

export default EditUsernameModal;
