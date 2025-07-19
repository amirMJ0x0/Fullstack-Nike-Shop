import api from "./api";

export const getOrders = async () => {
    try {
        const res = await api.get(`/orders/my`);
        return res.data;
    } catch (error) {
        console.error("Error fetching orders info:", error.response?.data || error.message);
    }
}

export const fetchOrderByOrderId = async (id) => {
    try {
        const res = await api.get(`/orders/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching order by id:", error.response?.data || error.message);
    }
};