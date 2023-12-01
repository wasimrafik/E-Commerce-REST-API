import express from "express";
import { addOrder, UpdateOrder, deleteOrder, getSingleOrder, getOrderByUser } from "../Controllers/order.controllers";
import auth from "../Middleware/auth.middleware";

const orderRouter = express.Router();

// orderRouter.get("/get-order/:userID", auth, getOrder);
// orderRouter.post("/add-order", auth, addOrder);
orderRouter.get("/getOrderByUser/:userID", getOrderByUser);
orderRouter.get("/getSingleOrder/:userID", getSingleOrder);
orderRouter.post("/addOrder/:userID", addOrder);
orderRouter.put("/updateorder/:orderID", UpdateOrder);
orderRouter.delete("/deleteOrder/:orderID", deleteOrder);

export default orderRouter;
