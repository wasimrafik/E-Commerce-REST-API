// import express from "express";
// import auth from "../Middleware/auth.middleware";
// import { addCartItems, deleteCartItems, getCartItems, updateQuantity } from "../Controllers/cartItem.controllers";

// const cartItemsRouter = express.Router();

// // cartItemsRouter.get("/getCart/:userID", auth, getCartItems);
// // cartItemsRouter.delete("/deleteCart/:cartItemsID", auth, deleteCartItems);
// // cartItemsRouter.put("/updateQuantity/:cartItemsID", auth, updateQuantity);
// cartItemsRouter.get("/getCartItems/:userID", getCartItems);
// cartItemsRouter.post("/addCartItems/:userID", addCartItems);
// cartItemsRouter.put("/updateQuantityItems/:cartItemsID",updateQuantity);
// cartItemsRouter.delete("/deleteCartItems/:cartItemsID", deleteCartItems);

// export default cartItemsRouter;