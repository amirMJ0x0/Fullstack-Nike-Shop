import axiosInstance from './axiosInstance';

// @desc Get All Products
// @route GET http://localhost:3000/products
export const getAllProducts = async (queryString) => {
    try {
        const response = await axiosInstance.get(`/api/products?${queryString}`)
        return response.data
    } catch (error) {
        console.error("Error fetching products info:", error.response?.data || error.message);
    }
}

// @desc Get All Products according to the search term
// @route GET http://localhost:3000/products/search
export const getProductsBySearchTerm = async (searchTerm) => {
    try {
        const response = await axiosInstance.get(`/api/products/search?query=${searchTerm}`)
        return response.data
    } catch (error) {
        console.error("Error fetching search results:", error);
    }
}

// @desc Fetch Product data using productId
// @route GET http://localhost:3000/api/products/:id
export const getProduct = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/products/${id}`)
        return response.data
    } catch (error) {
        console.error("Error fetching product info:", error.response?.data || error.message);
    }
}