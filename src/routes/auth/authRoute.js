import express from "express";
import {
  chnagePassword,
  login,
  logout,
  resetPassword,
  sendOTP,
  verifyOTP,
} from "../../controllers/auth/authController.js";

export const authRoute = express.Router();

authRoute.post("/login", login);

authRoute.post("/logout", logout);

authRoute.patch("/change-password", chnagePassword);

authRoute.post("/send-otp", sendOTP);

authRoute.post("/verify-otp", verifyOTP);

authRoute.patch("/reset-password", resetPassword);
