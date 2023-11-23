import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderItems = new Schema({
 

  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("orderItems", orderItems);
