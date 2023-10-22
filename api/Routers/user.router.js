import express from "express";
import {
  getUser,
  addUser,
  updateUser,
  deleteUser,
  signUP,
  logIn,
  OTPLogin,
  generateOTP,
} from "../Controllers/user.controllers";

const userRouter = express.Router();

console.log("ppppppp");

userRouter.get("/get-user", getUser);
userRouter.post("/add-user", addUser);
userRouter.put("/update-user/:user_id", updateUser);
userRouter.delete("/delete-user/:user_id", deleteUser);
userRouter.post("/signUP", signUP);
userRouter.get("/logIn", logIn);
userRouter.get("/OTPLogin", OTPLogin);
userRouter.patch("/generateOTP", generateOTP);

export default userRouter;
