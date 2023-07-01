import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routers/user.router";
import subCategoryRouter from "./Routers/sub_category.router";
import productRouter from "./Routers/product.router";
import orderRouter from "./Routers/order.router";
import categoryRouter from "./Routers/category.router";
import cartRouter from "./Routers/cart.router";
const app = express();

const PORT = process.env.PORT || 8005;

app.use(express.json());
app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log("PORT is connected at" + PORT);
});

mongoose.connect("mongodb://127.0.0.1:27017/NodeJSProject1").then(() => {
  console.log("Mongoose Is Connected");
});

app.use("/user", userRouter);
app.use("/subCategory", subCategoryRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/category", categoryRouter);
app.use("/cart", cartRouter);
