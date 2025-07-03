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
// @route PATCH http://localhost:3000/user/username
export const editUsername = async (username) => {
    try {
        const res = await api.patch("/user/username", { username });
        return res.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// @desc Initiate Email Change (Step 1)
// @route POST http://localhost:3000/user/initiate-email-change
export const initiateEmailChange = async (newEmail, currentPassword) => {
    try {
        const res = await api.post("/user/initiate-email-change", {
            newEmail,
            currentPassword
        });
        return res.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// @desc Verify Email Change Code (Step 2)
// @route POST http://localhost:3000/user/verify-email-change
export const verifyEmailChange = async (verificationCode) => {
    try {
        const res = await api.post("/user/verify-email-change", {
            verificationCode
        });
        return res.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// @desc Change Password
// @route PATCH http://localhost:3000/user/password
export const changePassword = async (oldPassword, newPassword) => {
    try {
        const res = await api.patch("/user/password", {
            oldPassword,
            newPassword
        });
        return res.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// @desc Update user profile info (fullName, phone, address, city, postalCode, country)
// @route PATCH http://localhost:3000/user/profile
export const updateUserProfile = async (fields) => {
    try {
        const res = await api.patch("/user/profile", fields);
        return res.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const getUserOrders = async () => {
    try {
        const res = await api.get("/orders/my")
        return res.data
    } catch (error) {
        throw error.response?.data || error
    }
}

export const createOrder = async (order) => {
    try {
        const res = await api.post("/orders/add", order);
        return res.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};