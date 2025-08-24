import express from "express";
import { forgotPassword, getProfile, loginUser, registerUser, resetPassword, updateProfile, verifyOtp, verifyResetOtp } from "../controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/verify',verifyOtp);
userRouter.post('/login',loginUser);
userRouter.post('/forgotpass',forgotPassword)
userRouter.post('/verifyotp',verifyResetOtp)
userRouter.post('/resetpass',resetPassword)
userRouter.put('/update-profile',authMiddleware,updateProfile)
userRouter.get('/profile',authMiddleware,getProfile)

export default userRouter