import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cart = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref:"users"
  },
  products: {
    type: Schema.Types.ObjectId,
    ref: "products",
  },
  size: {
    type: String,
    // required: true,
    default: 0,
  },
  color: {
    type: String,
    // required: true,
    default: 0,
  },
  quantity: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("cart", cart);
