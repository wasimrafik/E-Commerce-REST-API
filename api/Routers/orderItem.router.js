import express from "express";
import {
  UpdateOrderItems,
  addOrderItems,
  deleteOrderItems,
  getOrderItems,
} from "../Controllers/orderItem.controller";
import auth from "../Middleware/auth.middleware";

const orderItemsRouter = express.Router();

// orderRouter.get("/get-order/:userID", auth, getOrder);
// orderRouter.post("/add-order", auth, addOrder);
orderItemsRouter.get("/getOrderItems/:userID", getOrderItems);
orderItemsRouter.post("/addOrderItems/:userID", addOrderItems);
orderItemsRouter.put("/updateOrderItems/:orderItemsID", UpdateOrderItems);
orderItemsRouter.delete("/deleteOrderItems/:orderItemsID", deleteOrderItems);

export default orderItemsRouter;
