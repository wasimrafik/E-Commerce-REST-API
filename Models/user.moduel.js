import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema({
  First_Name: {
    type: String,
    required: true,
  },
  Last_Name: {
    type: String,
    required: null,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Mobile: {
    type: Number,
    required: true,
  },
  Date_Of_Birth: {
    type: Number,
    default: null,
  },
  Gender: {
    type: String,
    default: null,
  },
  About: {
    type: String,
    default: null,
  },
  Avatar: {
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
