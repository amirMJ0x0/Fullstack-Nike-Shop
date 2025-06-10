import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import { PiEyeBold } from "react-icons/pi";
import { PiEyeClosedBold } from "react-icons/pi";

const PasswordInput = ({
  register,
  purpose = "password",
  placeholder = "Enter Password",
  isDisabled = false,
  value,
  onChange,
}) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const inputProps = {
    pr: "4.5rem",
    variant: "flushed",
    type: show ? "text" : "password",
    placeholder,
    focusBorderColor: "#ff6452",
    isDisabled,
  };

  // If register is provided, use it (uncontrolled), else use value/onChange (controlled)
  if (register) {
    Object.assign(inputProps, register(purpose));
  } else {
    inputProps.value = value;
    inputProps.onChange = onChange;
  }

  return (
    <InputGroup size="md">
      <Input {...inputProps} />
      <InputRightElement width="2.5rem">
        <Button
          h="1.85rem"
          size="sm"
          fontSize={"lg"}
          variant={"ghost"}
          onClick={handleClick}
          tabIndex={-1}
        >
          {show ? <PiEyeBold /> : <PiEyeClosedBold />}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default PasswordInput;
