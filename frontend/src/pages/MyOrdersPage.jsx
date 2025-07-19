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
  Badge,
} from "@chakra-ui/react";

import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../services/orderServices";

const MyOrdersPage = () => {
  const navigate = useNavigate();

  const {
    data: orders = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  return (
    <Box maxW="900px" mx="auto" mt={8} p={4}>
      <Heading size="lg" mb={6}>
        My Orders
      </Heading>
      {loading ? (
        <Spinner size="lg" />
      ) : error ? (
        <Text color="red.500">
          {error?.response?.data?.message ||
            error.message ||
            "Something went wrong"}
        </Text>
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
            {orders.map((order) => {
              const totalQuantity = order.items.reduce(
                (acc, item) => acc + item.quantity,
                0
              );
              return (
                <Tr
                  key={order._id}
                  _hover={{ opacity: 0.5, cursor: "pointer" }}
                  onClick={() => navigate(`/orders/${order._id}`)}
                >
                  <Td>{order.orderNumber.slice(-6)}</Td>
                  <Td>{new Date(order.createdAt).toLocaleDateString()}</Td>
                  <Td>
                    <Badge
                      colorScheme={
                        order.status === "Delivered"
                          ? "green"
                          : order.status === "Pending"
                          ? "orange"
                          : "gray"
                      }
                    >
                      {order.status}
                    </Badge>
                  </Td>
                  <Td>${order.total.toFixed(2)}</Td>
                  <Td>{totalQuantity} items</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default MyOrdersPage;
