import axiosInstance from './axiosInstance';

// @desc Get All Products
// @route GET http://localhost:3000/products
export const getAllProducts = async () => {
    try {
        const response = await axiosInstance.get('/products')
        return response.data
    } catch (error) {
        console.error("Error fetching products info:", error.response?.data || error.message);
    }
}

// @desc Fetch Product data using productId
// @route GET http://localhost:3000/products/:id
export const getProduct = async (id) => {
    try {
        const response = await axiosInstance.get(`/products/${id}`)
        return response.data
    } catch (error) {
        console.error("Error fetching product info:", error.response?.data || error.message);
    }
}
