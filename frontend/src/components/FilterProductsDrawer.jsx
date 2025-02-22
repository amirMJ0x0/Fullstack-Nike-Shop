import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";

const FilterProductsDrawer = ({ onClose, isOpen, btnRef, children }) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      size={"xs"}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent overflow={"hidden"}>
        <DrawerCloseButton color={"#ff6452"} />
        <DrawerHeader color={'coral'}>Filters</DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterProductsDrawer;
