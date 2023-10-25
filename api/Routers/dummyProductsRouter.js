import express from "express";
import {
  getProduct,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getFilterProducts,
  productDetails,
} from "../Controllers/dummyProducts";

const dummyProductsRouter = express.Router();

dummyProductsRouter.get("/getProduct", getProduct);
dummyProductsRouter.get("/getSingleProduct/:product_id", getSingleProduct);
dummyProductsRouter.get("/productDetails/:product_id", productDetails);
dummyProductsRouter.get("/getFilterProducts", getFilterProducts);
dummyProductsRouter.post("/addProduct", addProduct);
dummyProductsRouter.put("/updateProduct/:product_id", updateProduct);
dummyProductsRouter.delete("/deleteProduct/:product_id", deleteProduct);

export default dummyProductsRouter;
