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
productRouter.get("/getSingleProduct/:productID", getSingleProduct);
productRouter.post("/addProduct", addProduct);
productRouter.put("/updateProduct/:productID", updateProduct);
productRouter.delete("/deleteProduct/:productID", deleteProduct);

export default productRouter;
