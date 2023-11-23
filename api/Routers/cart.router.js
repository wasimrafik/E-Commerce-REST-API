import express from "express";
import {
  getCart,
  addCart,
  deleteCart,
  updateCartQuantity,
} from "../Controllers/cart.controllers";
import auth from "../Middleware/auth.middleware";
const cartRouter = express.Router();

// cartRouter.get("/getCart/:userID", auth, getCart);
// cartRouter.post("/addCart/:userID", addCart);
// cartRouter.delete("/deleteCart/:cartID", auth, deleteCart);
cartRouter.get("/getCart/:userID",getCart);
cartRouter.post("/addCartItems/:userID", addCart);
cartRouter.put("/updateQuantityItems/:cartID",updateCartQuantity);
cartRouter.delete("/deleteCart/:cartID", deleteCart);


export default cartRouter;
