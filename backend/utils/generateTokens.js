const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.JWT_SECRET;
const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET;

const generateTokens = (userId) => {
    const accessToken = jwt.sign({ id: userId }, secretKey, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: userId }, refreshSecretKey, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};

module.exports = { generateTokens }