const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET || "ro8BS6Hiivgzy8Xuu09JDjlNLnSLldY5";


const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Access denied! Please Login" });
    }

    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Your token has expired. Please log in again." });
    }
    return res.status(403).json({ message: "Invalid or expired token.", error });
  }
};

module.exports = { verifyToken };
