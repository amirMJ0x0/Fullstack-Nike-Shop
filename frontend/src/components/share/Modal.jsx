import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

const CustomModal = ({ title, children, isOpen }) => {
  const { onClose } = useDisclosure();
  
  <Modal
    blockScrollOnMount={false}
    isOpen={isOpen}
    onClose={onClose}
    className="!size-80 !bg-dark !text-white-400 !rounded-md !z-50"
  >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>;
};

export default CustomModal;
