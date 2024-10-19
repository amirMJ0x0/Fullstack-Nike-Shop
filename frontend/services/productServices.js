import axios from 'axios'
const SERVER_URL = "http://localhost:3000";

// @desc Get All Products
// @route GET http://localhost:3000/products
export const getAllProducts = async () => {
    const url = `${SERVER_URL}/products`;

    const response = await axios.get(url)
    return response.data
}
