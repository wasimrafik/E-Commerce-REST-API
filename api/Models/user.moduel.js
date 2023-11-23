import mongoose from "mongoose";

const Schema = mongoose.Schema;

const users = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    default: "customer",
  },
  address: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addresses",
    },
  ],
  paymentInfo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "payment",
    },
  ],
  avatar: {
    type: String,
    default: null,
  },
  status: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("users", users);
