import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import { BsMoon, BsSun } from "react-icons/bs";
import { GrSystem } from "react-icons/gr";

const ThemeChanger = ({
  changeTheme,
  bgColor,
  textColor,
  isMobileMode = false,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      {isMobileMode ? (
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <BsMoon /> : <BsSun />}
        </Button>
      ) : (
        <Menu>
          <MenuButton
            as={Button}
            className="!bg-transparent !text-xl"
            marginRight={"-3.5"}
          >
            {colorMode === "light" ? (
              <BsSun />
            ) : colorMode === "dark" ? (
              <BsMoon />
            ) : null}
          </MenuButton>
          <Box bg={bgColor} color={textColor} className="!font-montserrat">
            <MenuList>
              <MenuItem
                icon={<BsSun />}
                value={"light"}
                onClick={(e) => changeTheme(e)}
              >
                Light
              </MenuItem>
              <MenuItem
                icon={<BsMoon />}
                value={"dark"}
                onClick={(e) => changeTheme(e)}
              >
                Dark
              </MenuItem>
              <MenuItem
                icon={<GrSystem />}
                value={"system"}
                onClick={(e) => changeTheme(e)}
              >
                System
              </MenuItem>
            </MenuList>
          </Box>
        </Menu>
      )}
    </>
  );
};

export default ThemeChanger;
