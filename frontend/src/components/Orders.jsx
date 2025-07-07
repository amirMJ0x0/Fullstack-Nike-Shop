import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Text,
  Image,
} from "@chakra-ui/react";
import api from "../services/api";
import { useQuery } from "@tanstack/react-query";

const Orders = () => {
  const fetchOrders = async () => {
    const res = await api.get("/orders/my");
    return res.data;
  };

  const {
    data: orders = [],
    isLoading: loading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  return (
    <Box maxW="900px" mx="auto" mt={8} p={4}>
      <Heading size="lg" mb={6}>
        My Orders
      </Heading>
      {loading ? (
        <Spinner size="lg" />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : orders.length === 0 ? (
        <div className="flex justify-center my-20">
          <Image
            className="size-72 md:size-1/3"
            src={"/No-results-found.png"}
            alt="There is no favorites yet."
            loading="lazy"
            opacity={50}
            draggable={false}
          />
        </div>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Order ID</Th>
              <Th>Date</Th>
              <Th>Status</Th>
              <Th>Total</Th>
              <Th>Items</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order) => (
              <Tr key={order._id}>
                <Td>{order.orderNumber.slice(-6)}</Td>
                <Td>{new Date(order.createdAt).toLocaleDateString()}</Td>
                <Td>{order.status}</Td>
                <Td>${order.total.toFixed(2)}</Td>
                <Td>{order.items.length}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default Orders;
