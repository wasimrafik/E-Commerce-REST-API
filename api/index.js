import express from "express";
import mongoose, { connect } from "mongoose";
import userRouter from "./Routers/user.router";
import productRouter from "./Routers/product.router";
import orderRouter from "./Routers/order.router";
import categoryRouter from "./Routers/category.router";
import cartRouter from "./Routers/cart.router";
import cors from 'cors';
import cookieParser from 'cookie-parser'
import {connectDB} from './Config/db'
import orderItemsRouter from "./Routers/orderItem.router";
import addressRouter from "./Routers/address.router";

const app = express();

const PORT = process.env.PORT || 8001;

app.use(express.json());
app.use(express.static(__dirname));
app.use(cookieParser());


app.listen(PORT, async () => {
  await connectDB();
  console.log("PORT is connected at" + PORT);
});

// mongoose.connect("mongodb://127.0.0.1:27017/E-Commerce").then(() => {
//   console.log("Mongoose Is Connected");
// });

app.use(cors({
  credentials: true,
  origin:'http://localhost:3000',
}))

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use('/orderItems', orderItemsRouter)
app.use("/order", orderRouter);
app.use("/category", categoryRouter);
app.use("/cart", cartRouter);
app.use('/address', addressRouter);
