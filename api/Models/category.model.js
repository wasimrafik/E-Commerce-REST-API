import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categories = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories'
  },
  level: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("categories", categories);
