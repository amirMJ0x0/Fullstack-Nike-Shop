import axios from 'axios'
const SERVER_URL = "http://localhost:3000";

// @desc Get All Products
// @route GET http://localhost:3000/products
export const getAllProducts = async () => {
    const url = `${SERVER_URL}/products`;
    const response = await axios.get(url)
    return response.data
}

// @desc Fetch Product data using productId
// @route GET http://localhost:3000/products/:id
export const getProduct = async (id) => {
    const url = `${SERVER_URL}/products/${id}`;
    const response = await axios.get(url)
    return response.data
}
