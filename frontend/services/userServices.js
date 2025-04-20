import axiosInstance from "./axiosInstance";

// @desc Get user info
// @route GET http://localhost:3000/auth/userInfo
export const fetchUserInfo = async () => {
    try {
        const res = await axiosInstance.get(`/auth/userInfo`);
        return res.data;
    } catch (error) {
        console.error("Error fetching user info:", error.response?.data || error.message);
    }
};

// @desc toggleSaveProduct
// @route GET http://localhost:3000/users/save-product
export const toggleSaveProduct = async (productId) => {
    try {
        const res = await axiosInstance.post(`/users/save-product`, { productId });
        return res.data;
    } catch (error) {
        console.error("error toggling saved product:", error.response?.data || error.message);
    }
};

// @desc getSavedProducts
// @route GET http://localhost:3000/users/saved-products
export const getSavedProducts = async () => {
    try {
        const res = await axiosInstance.get(`/users/saved-products`);
        return res.data;
    } catch (error) {
        console.error("error fetching saved products:", error.response?.data || error.message);
    }
};


// @desc getUserProfile
// @route GET http://localhost:3000/users/profile
export const getUserProfile = async () => {
    try {
        const res = await axiosInstance.get(`/users/profile`);
        return res.data;
    } catch (error) {
        console.error("error fetching saved products:", error.response?.data || error.message);
    }
};


// @desc getUserComments
// @route GET http://localhost:3000/users/comments
export const getUserComments = async () => {
    try {
        const res = await axiosInstance.get(`/users/comments`);
        return res.data;
    } catch (error) {
        console.error("error fetching saved products:", error.response?.data || error.message);
    }
};

