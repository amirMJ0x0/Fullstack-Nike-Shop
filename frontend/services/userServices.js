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