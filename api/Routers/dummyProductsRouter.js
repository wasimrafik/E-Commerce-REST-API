import express from "express";
import {
  getProduct,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../Controllers/dummyProducts";

const dummyProductsRouter = express.Router();

dummyProductsRouter.get("/getProduct", getProduct);
dummyProductsRouter.get("/getSingleProduct/:product_id", getSingleProduct);
dummyProductsRouter.post("/addProduct", addProduct);
dummyProductsRouter.put("/updateProduct/:product_id", updateProduct);
dummyProductsRouter.delete("/deleteProduct/:product_id", deleteProduct);

export default dummyProductsRouter;
