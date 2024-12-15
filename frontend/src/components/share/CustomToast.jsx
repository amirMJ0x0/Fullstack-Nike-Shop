import { useToast } from "@chakra-ui/react";

const CustomToast = ({
  title = "",
  message = "",
  type = "",
  position,
  duration,
}) => {
  const toast = useToast();
  const id = "test-toast";
  // types are: "success", "info", "warning", "error"

  if (!toast.isActive(id))
    toast({
      id,
      title,
      description: message,
      status: type,
      position: position || "top-right",
      isClosable: true,
      duration: duration || 4000,
      variant: "left-accent",
    });
};

export default CustomToast;
