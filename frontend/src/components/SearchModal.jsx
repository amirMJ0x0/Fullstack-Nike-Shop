import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getProductsBySearchTerm } from "../services/productServices";
import useDebounce from "../hooks/useDebounce";
import {
  Image,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

const SearchModal = ({ isOpen, onClose }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const bgColor = useColorModeValue("gray.100", "gray.600");
  const fetchResults = async (searchTerm) => {
    if (!searchTerm) return setResults([]);

    const data = await getProductsBySearchTerm(searchTerm);
    setResults(data);
  };

  const debouncedFetchResults = useDebounce(fetchResults, 500);
  const handleSearch = (e) => {
    setQuery(e.target.value);
    debouncedFetchResults(e.target.value);
  };
  const handleSelectProduct = (productId) => {
    navigate(`/products/${productId}`);
    onClose();
  };
  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && query) {
      navigate(`/products?search=${query}`);
      onClose();
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={4}>
          <InputGroup>
            <Input
              placeholder="Search for products..."
              focusBorderColor="coral"
              value={query}
              onChange={handleSearch}
              onKeyDown={handleSearchSubmit}
              autoFocus
            />
            <InputRightElement
              cursor={"pointer"}
              onClick={() => {
                navigate(`/products?search=${query}`);
                onClose();
              }}
            >
              <BsSearch />
            </InputRightElement>
          </InputGroup>

          {results?.length > 0 && (
            <List mt={3} border="1px solid #ddd" borderRadius="md">
              {results.map((product) => (
                <ListItem
                  key={product._id}
                  p={2}
                  _hover={{ bgColor, cursor: "pointer" }}
                  display="flex"
                  alignItems="center"
                  onClick={() => handleSelectProduct(product._id)}
                >
                  <Image
                    src={product.imageUrl}
                    boxSize="40px"
                    borderRadius="md"
                    mr={2}
                  />
                  <Text fontSize="sm">{product.name}</Text>
                </ListItem>
              ))}
            </List>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SearchModal;
