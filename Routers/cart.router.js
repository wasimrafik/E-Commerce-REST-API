import express from "express";
import {
  getCart,
  addCart,
  updateCart,
  deleteCart,
  updateQuantity,
} from "../Controllers/cart.controllers";
import auth from "../Middleware/auth.middleware";
const cartRouter = express.Router();

cartRouter.get("/getCart/:cartID", auth, getCart);
cartRouter.post("/addCart", auth, addCart);
cartRouter.delete("/deleteCart/:cartID", auth, deleteCart);
cartRouter.put("/updateQuantity/:cartID", auth, updateQuantity);

export default cartRouter;
