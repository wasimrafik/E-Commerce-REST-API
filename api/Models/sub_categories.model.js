import mongoose from "mongoose";
import Category from "../Models/category.model";

const Schema = mongoose.Schema;

const Sub_category = new Schema({
  Name: {
    type: String,
    required: true,
  },
  CategoryID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Category,
  },
  image: {
    type: String,
    default: null,
  },
  CreatedAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("Sub_category", Sub_category);
