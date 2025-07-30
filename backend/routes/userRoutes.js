import express from "express";
import { registerUser, verifyOtp } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/verify',verifyOtp);

export default userRouter