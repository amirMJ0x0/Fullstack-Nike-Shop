import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
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
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";

const CommentModal = ({
  productData,
  onClose,
  isOpen,
  mode = "add",
  initialData = {},
  onSubmit,
  isLoading,
}) => {
  const [text, setText] = useState(initialData.text || "");
  const [rating, setRating] = useState(initialData.rating || 5);

  useEffect(() => {
    if (isOpen) {
      setText(initialData.text || "");
      setRating(initialData.rating || 5);
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ text, rating });
  };

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {mode === "edit" ? "Edit Your Review" : "Leave Your Review"}
        </ModalHeader>
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
              activeColor="#ffd700"
            />
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write down your review ..."
              className="border p-2 w-full"
              isRequired
            />

            <Button
              type="submit"
              className="btn-primary"
              disabled={isLoading}
              isLoading={isLoading}
            >
              {isLoading
                ? mode === "edit"
                  ? "Updating..."
                  : "Sending..."
                : mode === "edit"
                ? "Update Review"
                : "Send Review"}
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CommentModal;
