import api from "./api";

// @desc Get user info
// @route GET http://localhost:3000/auth/userInfo
export const fetchUserInfo = async () => {
    try {
        const res = await api.get(`/auth/userInfo`);
        return res.data;
    } catch (error) {
        console.error("Error fetching user info:", error.response?.data || error.message);
    }
};

// @desc toggleSaveProduct
// @route GET http://localhost:3000/user/save-product
export const toggleSaveProduct = async (productId) => {
    try {
        const res = await api.post(`/user/save-product`, { productId });
        return res.data;
    } catch (error) {
        console.error("error toggling saved product:", error.response?.data || error.message);
    }
};

// @desc getSavedProducts
// @route GET http://localhost:3000/user/saved-products
export const getSavedProducts = async () => {
    try {
        const res = await api.get(`/user/saved-products`);
        return res.data;
    } catch (error) {
        console.error("error fetching saved products:", error.response?.data || error.message);
    }
};


// @desc getUserProfile
// @route GET http://localhost:3000/user/profile
export const getUserProfile = async () => {
    try {
        const res = await api.get(`/user/profile`);
        return res.data;
    } catch (error) {
        console.error("error fetching saved products:", error.response?.data || error.message);
    }
};


// @desc EditUsername
// @route PATCH http://localhost:3000/user/profile
export const editUsername = async (username) => {

    await api.patch("/user/profile", { username });
};

