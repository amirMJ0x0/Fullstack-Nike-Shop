import { Input, InputGroup, useColorModeValue, Box } from "@chakra-ui/react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useState } from "react";

const CustomPhoneInput = ({
  value,
  onChange,
  defaultCountry = "IR",
  error,
  setError,
  ...props
}) => {
  const [touched, setTouched] = useState(false);
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const focusBorderColor = useColorModeValue("coral", "coral");
  // Validate on blur or change
  const handleBlur = () => {
    setTouched(true);
    if (value && !isValidPhoneNumber(value)) {
      setError?.("Invalid phone number");
    } else {
      setError?.("");
    }
  };

  const handleChange = (val) => {
    if (val && val.replace(/\D/g, "").length > 15) return;
    onChange(val);
    if (touched && val && !isValidPhoneNumber(val)) {
      setError?.("Invalid phone number");
    } else {
      setError?.("");
    }
  };

  return (
    <InputGroup>
      <Box flex="1">
        <PhoneInput
          international
          defaultCountry={defaultCountry}
          initialValueFormat="national"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          inputComponent={Input}
          inputProps={{
            bg,
            borderColor,
            focusBorderColor,
            maxLength: 20,
            ...props,
          }}
          countrySelectProps={{}}
          className="chakra-phone-input"
        />
      </Box>
    </InputGroup>
  );
};

export { CustomPhoneInput as PhoneInput };
