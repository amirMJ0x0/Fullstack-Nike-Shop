import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

const CustomModal = ({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = "Yes, I'm sure",
  cancelText = "Cancel",
  showFooter = true,
}) => {
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent rounded={"lg"}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        {showFooter && (
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              {cancelText}
            </Button>
            <Button colorScheme="red" onClick={onConfirm}>
              {confirmText}
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
