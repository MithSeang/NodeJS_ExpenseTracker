const authController = require("../controller/auth.controller");
const verifyToken = require("../middleware/auth.middleware");
const auth = (app) => {
  app.post("/api/login", authController.loginUser);
  app.get("/api/users", authController.readUser);
  app.post("/api/register", authController.registerUser);
  app.get("/api/currentuser", verifyToken, authController.getCurrentUser);
};
module.exports = auth;
