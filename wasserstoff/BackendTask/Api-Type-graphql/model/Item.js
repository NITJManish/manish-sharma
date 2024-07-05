import mongoose from "mongoose";

export const itemsSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter name"],
    },
    description:String,
    price:Number,
    available:{
        type:Boolean,
        default:false
    }
})

export default mongoose.model("Item",itemsSchema);