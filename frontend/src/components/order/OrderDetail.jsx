// components/order/OrderDetail.jsx
import {
  Box,
  Heading,
  Text,
  VStack,
  Divider,
  HStack,
  Image,
  Badge,
} from "@chakra-ui/react";

const OrderDetail = ({ order }) => {
  if (!order) return <Text>No order found</Text>;

  return (
    <Box>
      <Heading size="md" mb={4}>
        Order #{order.orderNumber}
      </Heading>
      <Text fontSize="sm" color="gray.500">
        Ordered on: {new Date(order.createdAt).toLocaleDateString()}
      </Text>
      <Text fontSize="sm" color="gray.500">
        Delivery Date: {new Date(order.deliveryDate).toLocaleDateString()}
      </Text>
      <Text fontSize="sm" color="gray.500">
        Payment Method: {order.paymentInfo.method}
      </Text>
      <Text fontSize="sm" color="gray.500">
        Status: <Badge colorScheme="green">{order.status || "Pending"}</Badge>
      </Text>

      <Divider my={4} />
      <VStack align="stretch" spacing={4}>
        {order.items.map((item) => {
          const { product } = item;
          
          return (
            <HStack key={product} spacing={4}>
              <Image
                src={product.imageUrl[0]}
                boxSize="60px"
                objectFit="cover"
                borderRadius="md"
              />
              <Box>
                <Text>{product.name}</Text>
                <Text fontSize="sm" color="gray.500">
                  {item.quantity} × ${product.price?.toFixed(2)}
                </Text>
              </Box>
            </HStack>
          );
        })}
      </VStack>

      <Divider my={4} />
      <Text fontWeight="bold">Total: ${order.total.toFixed(2)}</Text>
    </Box>
  );
};

export default OrderDetail;
