import express from "express";

import {
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../Controllers/category.controllers";

const categoryRouter = express.Router();

categoryRouter.get("/getcategory", getCategory);
categoryRouter.post("/addcategory", addCategory);
categoryRouter.put("/updatecategory/:category_id", updateCategory);
categoryRouter.delete("/deletecategory/:category_id", deleteCategory);

export default categoryRouter;
