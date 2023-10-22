import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Cart = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  productID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("Cart", Cart);
