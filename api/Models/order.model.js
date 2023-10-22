import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Order = new Schema({
  UserID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  ProductID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  Quantity: {
    type: Number,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("Order", Order);
