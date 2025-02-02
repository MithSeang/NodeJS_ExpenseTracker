const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  console.log(token);
  if (!token) {
    return res.status(403).json({ message: "Access denied, Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, "expenses");
    console.log("Decoded Token:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(500).json({ message: "Invalid token" });
  }
};
module.exports = verifyToken;
