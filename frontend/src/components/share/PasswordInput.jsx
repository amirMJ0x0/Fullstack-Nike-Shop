import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import { PiEyeBold } from "react-icons/pi";
import { PiEyeClosedBold } from "react-icons/pi";

const PasswordInput = ({
  register,
  purpose = "password",
  placeholder = "Enter Password",
}) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        variant={"flushed"}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        focusBorderColor="#ff6452"
        {...register(purpose)}
      />
      <InputRightElement width="2.5rem">
        <Button
          h="1.85rem"
          size="sm"
          fontSize={"lg"}
          variant={"ghost"}
          onClick={handleClick}
        >
          {show ? <PiEyeBold /> : <PiEyeClosedBold />}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
export default PasswordInput;
