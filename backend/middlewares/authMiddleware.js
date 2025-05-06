const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.JWT_SECRET;
const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET;

const verifyToken = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken && !refreshToken) {
      return res.status(401).json({ message: "Access denied! Please Login" });
    }

    try {
      // Try to verify access token first
      const decoded = jwt.verify(accessToken, secretKey);
      req.user = decoded;
      return next();
    } catch (accessTokenError) {
      // If access token is invalid or expired, try refresh token
      if (accessTokenError.name === "TokenExpiredError" && refreshToken) {
        try {
          const decodedRefresh = jwt.verify(refreshToken, refreshSecretKey);

          // Generate new tokens
          const newAccessToken = jwt.sign({ id: decodedRefresh.id }, secretKey, { expiresIn: '15m' });
          const newRefreshToken = jwt.sign({ id: decodedRefresh.id }, refreshSecretKey, { expiresIn: '7d' });

          // Set new tokens in cookies
          res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
            maxAge: 15 * 60 * 1000, // 15 minutes
          });

          res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });

          // Set user in request
          req.user = decodedRefresh;
          return next();
        } catch (refreshTokenError) {
          // If refresh token is also invalid, clear cookies and return error
          res.clearCookie('accessToken');
          res.clearCookie('refreshToken');
          return res.status(401).json({ message: "Session expired. Please log in again." });
        }
      }

      // If access token is invalid and no refresh token, return error
      return res.status(401).json({ message: "Invalid token. Please log in again." });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { verifyToken };
