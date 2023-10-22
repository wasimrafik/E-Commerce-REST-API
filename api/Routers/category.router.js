import express from "express";

import {
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../Controllers/category.controllers";

const categoryRouter = express.Router();

categoryRouter.get("/get-category", getCategory);
categoryRouter.post("/add-category", addCategory);
categoryRouter.put("/update-category/:category_id", updateCategory);
categoryRouter.delete("/delete-category/:category_id", deleteCategory);

export default categoryRouter;
