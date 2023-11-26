import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orders = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "products",
  },
  cart: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "cart",
  },
  orderDate: {
    type: Date,
    default: Date.now(),
  },
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "addresses",
  },
  paymentDetails: {

    paymentMethod: {
      type: String,
    },
    transactionID: {
      type: String, 
    },
    paymentID: {
      type: String,
    },
    paymentStatus: {
      type: String,
      default: "pending",
    },
  },
  totalPrice: {
    type: Number,
  },
  orderStatus: {
    type: String,
    default: "pending",
  },
  totalItem: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("orders", orders);
