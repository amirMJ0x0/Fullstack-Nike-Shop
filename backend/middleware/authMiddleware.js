const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET || "ro8BS6Hiivgzy8Xuu09JDjlNLnSLldY5";

// Middleware برای بررسی توکن
const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token; // گرفتن توکن از کوکی‌ها
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, secretKey); // تأیید صحت توکن
    req.user = decoded; // اضافه کردن اطلاعات کاربر به request
    next(); // رفتن به مرحله بعدی
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token.", error });
  }
};

module.exports = { verifyToken };
