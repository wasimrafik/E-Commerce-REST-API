import mongoose from "mongoose";
import Category from "../Models/category.model";
import Sub_categories from "../Models/sub_categories.model";
const Schema = mongoose.Schema;

const Product = new Schema({
  Name: {
    type: String,
    required: true,
  },
  CategoryID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Category,
  },
  SubCategoryID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Sub_categories,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  short_Description: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Thumbnail: {
    type: String,
    default: null,
  },
  Images: {
    type: String,
    default: null,
  },
  Status: {
    type: String,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("Product", Product);
