import mongoose from "mongoose";

const Schema = mongoose.Schema;


const addresses = new Schema({
    fullName:{
        type: String,
        // required: true,
    },
    streetAddress:{
        type: String,
        // required: true,
    },
    city:{
        type: String,
        // required: true,
    },
    state:{
        type: String,
        // required: true,
    },
    pincode:{
        type: String,
        // required: true,
    },
    country:{
        type: String,
        // required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    email:{
        type: String,
        // required: true,
    }
})


export default mongoose.model("addresses ", addresses)