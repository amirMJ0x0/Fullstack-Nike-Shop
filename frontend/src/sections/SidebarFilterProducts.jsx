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

const SidebarFilterProducts = ({ filters, handleCheckboxChange }) => {
  return (
    <aside className="col-span-1 h-screen mt-3">
      {/* Filter  */}
      <Accordion allowToggle>
        {productFilters.map((filter) => (
          <AccordionItem key={filter.label} p={2}>
            <h2>
              <AccordionButton>
                <Box
                  as="span"
                  flex="1"
                  textAlign="left"
                  fontFamily={"palanquin"}
                  fontWeight={"bold"}
                  fontSize={"xl"}
                >
                  {filter.label}{" "}
                  {filters[filter.filterType] &&
                  filters[filter.filterType].size > 0
                    ? `(${filters[filter.filterType].size})`
                    : ""}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Stack
                spacing={0}
                p={3}
                direction={`${filter.options.length < 5 ? "column" : "row"}`}
                className="info-text"
                flexWrap={"wrap"}
              >
                {filter.options.map((option) => (
                  <Checkbox
                    p={1}
                    mx={2}
                    colorScheme="orange"
                    value={option}
                    key={option}
                    // isChecked={filters[filter.filterType]?.has(option)}
                    onChange={() =>
                      handleCheckboxChange(filter.filterType, option)
                    }
                  >
                    {option}
                  </Checkbox>
                ))}
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  );
};

export default SidebarFilterProducts;
