import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orders = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  size: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 0,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    default: 0,
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
    required: true,
  },
  totalDiscountedPrice: {
    type: Number,
    default: 0,
  },

  orderStatus: {
    type: String,
    required: true,
    default: "pending",
  },
  totalItem: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("orders", orders);
