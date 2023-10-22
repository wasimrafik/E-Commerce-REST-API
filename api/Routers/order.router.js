import express from "express";
import { getOrder, addOrder } from "../Controllers/order.controllers";
import auth from "../Middleware/auth.middleware";

const orderRouter = express.Router();

orderRouter.get("/get-order/:userID", auth, getOrder);
orderRouter.post("/add-order", auth, addOrder);

export default orderRouter;
