import express from "express";
import {
  getSub_category,
  getSingleSub_category,
  addSub_category,
  updateSub_category,
  // updateSubCategory,
  deleteSub_category,
} from "../Controllers/sub_category.controllers";

const subCategory = express.Router();

subCategory.get("/getsubCategory", getSub_category);
subCategory.get(
  "/getsinglesubCategory/:sub_category_id",
  getSingleSub_category
);
subCategory.post("/addsubCategory", addSub_category);
subCategory.put("/updatesubCategory/:sub_category_id", updateSub_category);
// subCategory.put("/updatesubCategory/:sub_category_id", updateSubCategory);
subCategory.delete("/deletesubCategory/:sub_category_id", deleteSub_category);

export default subCategory;
