import axios from 'axios'
const SERVER_URL = "http://localhost:3000";

// @desc Get user info
// @route GET http://localhost:3000/auth/userInfo
export const fetchUserInfo = async () => {
    const res = await axios.get(`${SERVER_URL}/auth/userInfo`, {
        withCredentials: true,
    });
    return res.data;
};