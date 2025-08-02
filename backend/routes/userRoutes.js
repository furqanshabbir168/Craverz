import express from "express";
import { loginUser, registerUser, verifyOtp } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/verify',verifyOtp);
userRouter.post('/login',loginUser);

export default userRouter