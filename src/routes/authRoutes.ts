const { Router } = require("express");
const authController = require("../controllers/authController");

const authRouter = Router();

// Sign-up route
authRouter.post("/signup", authController.signup);

// Log-in route
authRouter.post("/login", authController.login);

// Refresh token route
// router.post("/refresh-token", authController.refreshToken);

// Logout route
// router.post("/logout", authController.logout);

module.exports = authRouter;
