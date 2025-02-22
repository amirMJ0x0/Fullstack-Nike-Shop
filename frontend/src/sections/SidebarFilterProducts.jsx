import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
  Stack,
} from "@chakra-ui/react";
import { productFilters } from "../constants";

const SidebarFilterProducts = ({ filters, handleFilterChange }) => {
  return (
    <aside className="col-span-1 h-screen mt-3">
      {/* Filter  */}
      <Accordion allowToggle>
        {productFilters.map((item) => (
          <AccordionItem key={item.label} p={2}>
            <h2>
              <AccordionButton>
                <Box
                  as="span"
                  flex="1"
                  textAlign="left"
                  fontFamily={"palanquin"}
                  fontWeight={"bold"}
                  fontSize={{ base: "lg", md: "xl" }}
                >
                  {item.label}{" "}
                  {filters[item.filterType] && filters[item.filterType].size > 0
                    ? `(${filters[item.filterType].size})`
                    : ""}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Stack
                spacing={0}
                p={3}
                direction={`${
                  Object.keys(item.options).length < 5 ? "column" : "row"
                }`}
                className="info-text"
                flexWrap={"wrap"}
              >
                {item.options.map((option, index) => {
                  return (
                    <Checkbox
                      p={1}
                      mx={2}
                      colorScheme="orange"
                      value={option.value}
                      key={index}
                      isChecked={
                        Array.isArray(filters[item.filterType])
                          ? filters[item.filterType].includes(option.value)
                          : filters[item.filterType] === option.value
                      }
                      onChange={() =>
                        handleFilterChange(item.filterType, option.value)
                      }
                    >
                      {option.label}
                    </Checkbox>
                  );
                })}
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  );
};

export default SidebarFilterProducts;
