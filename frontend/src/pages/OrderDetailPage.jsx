// pages/OrderDetailPage.jsx
import { useParams } from "react-router-dom";
import { Spinner, Box, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import OrderDetail from "../components/order/OrderDetail";
import { fetchOrderByOrderId } from "../services/orderServices";

const OrderDetailPage = () => {
  const { id } = useParams();

  const {
    data: order,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["order", id],
    queryFn: () => fetchOrderByOrderId(id),
  });
  if (isLoading) return <Spinner size="lg" />;
  if (isError)
    return (
      <div className="flex justify-center my-32">
        <Image
          className="size-72 md:size-1/3"
          src={"transparent-emptyCart.png"}
          loading="lazy"
          opacity={50}
          draggable={false}
        />
        <Text color="red.500">
          {error?.response?.data?.message || error.message}
        </Text>
      </div>
    );

  return (
    <Box maxW="700px" mx="auto" mt={10} mb={20} p={4}>
      <OrderDetail order={order} />
    </Box>
  );
};

export default OrderDetailPage;
