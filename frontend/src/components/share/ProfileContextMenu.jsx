import {
  Menu,
  MenuButton,
  MenuItem,
  useDisclosure,
  Box,
  MenuList,
  Button,
} from "@chakra-ui/react";
import { FaRegUser, FaRegUserCircle } from "react-icons/fa";
import { GrBasket, GrFavorite, GrLogout } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const ProfileContextMenu = ({ textColor, bgColor }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const { user, logOut } = useAuth();

  return (
    <>
      {user ? (
        <Menu isOpen={isOpen}>
          <MenuButton
            as={Button}
            color="#ff6452"
            size={{ base: "sm", md: "md" }}
            fontSize={"xl"}
            className="flex gap-2 text-2xl"
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
            onClick={onToggle}
          >
            <span className="max-lg:hidden">
              {user?.username.length < 6
                ? user?.username
                : user?.username.slice(0, 5) + ".."}
            </span>{" "}
            <FaRegUserCircle className="inline-block" />
          </MenuButton>
          <Box bg={bgColor} color={textColor} className="!font-montserrat">
            <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
              <MenuItem
                icon={<FaRegUser />}
                onClick={() => navigate("/profile")}
              >
                View Profile
              </MenuItem>
              <MenuItem icon={<GrBasket />}>My Orders</MenuItem>
              <MenuItem icon={<GrFavorite />}>Wish List</MenuItem>
              <MenuItem
                icon={<GrLogout />}
                onClick={logOut}
                textColor={"red.500"}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Box>
        </Menu>
      ) : (
        <Button
          color="#ff6452"
          size={{ base: "sm", md: "md" }}
          fontSize={"xl"}
          className="flex gap-2 text-2xl"
          onClick={() => navigate("/login")}
        >
          <FaRegUserCircle className="inline-block" />
        </Button>
      )}
    </>
  );
};

export default ProfileContextMenu;
