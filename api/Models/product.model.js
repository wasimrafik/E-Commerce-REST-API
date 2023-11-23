import mongoose from "mongoose";
const Schema = mongoose.Schema;

const products = new Schema({
  title: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
  },
  discountedPercent: {
    type: Number,
  },
  quantity: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  color: [{
    name:{type:String},
    quantity:{type:Number}
  }],
  size: [{
    name:{type:String},
    quantity:{type:Number}
  }],

  imageUrl: {
    type: String,
    default: null,
  },
  Images: [{
    type: String,
    default: null,
  }],
  Status: {
    type: String,
    default: 1,
  },
  Category: {
    type: Schema.Types.ObjectId,
    ref: 'categories',  
  },
  
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("products", products);
