import express from "express";
import {
  loginUser,
  registerUser,
  logout,
  refreshToken,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logout);
userRouter.post("/refresh-token", refreshToken);

export default userRouter;
