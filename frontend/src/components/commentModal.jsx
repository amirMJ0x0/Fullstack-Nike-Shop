import React, { useState } from "react";
import useAddComment from "../hooks/useAddComment";
import { useAuth } from "../context/AuthProvider";
import ReactStars from "react-stars";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import CustomModal from "./share/Modal";

const CommentModal = ({ productData, onClose, isOpen }) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const { mutate, isLoading } = useAddComment(productData._id);
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return alert("لطفاً ابتدا وارد شوید!");

    mutate(
      { text, rating },
      {
        onSuccess: () => {
          setText("");
          onClose();
        },
      }
    );
  };

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Leave Your Review</ModalHeader>
        <ModalCloseButton color={"coral"} />
        <ModalBody>
          <Flex
            gap={4}
            alignItems={"center"}
            shadow={"base"}
            px={3}
            m={4}
            rounded={"xl"}
          >
            <Box w={12}>
              <Image className="max-w-full" src={productData.imageUrl} />
            </Box>
            <Heading size={"sm"}>{productData.name}</Heading>
          </Flex>
          <form
            onSubmit={handleSubmit}
            className="p-4 space-y-4 flex flex-col items-center"
          >
            <ReactStars
              count={5}
              value={rating}
              onChange={setRating}
              size={40}
              color2={"#ffd700"}
            />
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write down your review ..."
              className="border p-2 w-full"
            />

            <Button
              type="submit"
              className="btn-primary"
              disabled={isLoading}
              isLoading={isLoading}
            >
              {isLoading ? "Sending..." : "Send Review"}
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CommentModal;
