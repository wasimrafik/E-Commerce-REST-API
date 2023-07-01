import express from "express";
import {
  getProduct,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../Controllers/products.controllers";

const productRouter = express.Router();

productRouter.get("/getProduct", getProduct);
productRouter.get("/getSingleProduct/:product_id", getSingleProduct);
productRouter.post("/addProduct", addProduct);
productRouter.put("/updateProduct/:product_id", updateProduct);
productRouter.delete("/deleteProduct/:product_id", deleteProduct);

export default productRouter;
