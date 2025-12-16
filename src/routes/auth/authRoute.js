import express from "express"
import { chnagePassword, login, logout, resetPassword, sendOTP, verifyOTP } from "../../controllers/auth/authController.js";

export const authRoute = express.Router();

authRoute.post("/login",login)

authRoute.post("/logout",logout)

authRoute.post("/change-password",chnagePassword)

authRoute.post("/send-otp",sendOTP)

authRoute.post("/verify-otp",verifyOTP)

authRoute.post("/reset-password",resetPassword)
