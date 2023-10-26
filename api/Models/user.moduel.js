import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema({
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
  DOB: {
    type: Number,
    default: null,
  },
  gender: {
    type: String,
    default: null,
  },
  about: {
    type: String,
    default: null,
  },
  avatar: {
    type: String,
    default: null,
  },
  OTP: {
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

export default mongoose.model("User", User);
