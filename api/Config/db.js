import mongoose from "mongoose"

const mongoDBURL = 'mongodb+srv://wasimrafik:qKxDr5DZF2hsdJOL@cluster0.59nhwdd.mongodb.net/?retryWrites=true&w=majority';

const connectDB = () => {
    return mongoose.connect(mongoDBURL);
}

module.exports={connectDB};