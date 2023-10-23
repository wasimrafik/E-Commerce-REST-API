import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routers/user.router";
import subCategoryRouter from "./Routers/sub_category.router";
import productRouter from "./Routers/product.router";
import orderRouter from "./Routers/order.router";
import categoryRouter from "./Routers/category.router";
import cartRouter from "./Routers/cart.router";
import dummyProducts from "./Routers/dummyProductsRouter";
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 8001;

app.use(express.json());
app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log("PORT is connected at" + PORT);
});

mongoose.connect("mongodb://127.0.0.1:27017/E-Commerce").then(() => {
  console.log("Mongoose Is Connected");
});

app.use(cors({
  credentials: true,
  origin:'http://localhost:3000',
}))

app.use("/user", userRouter);
app.use("/subCategory", subCategoryRouter);
// app.use("/product", productRouter);
app.use("/product", dummyProducts);
app.use("/order", orderRouter);
app.use("/category", categoryRouter);
app.use("/cart", cartRouter);
