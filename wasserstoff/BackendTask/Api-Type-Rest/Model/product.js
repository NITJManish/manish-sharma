import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter product name"],
        maxLength:[50,"product name cannot exceed 200 character"],
    },
    price:{
        type:Number,
        required:[true,"please enter product price"],
        maxLength:[5,"product price cannot exceed 5 digit"],
    },
    description:{
        type:String,
        required:[true,"please enter product descrition"],
    },
    category:{
        type:String,
        required:[true,"please enter product category"],
        enum:{
            values:[
                "Electronics",
                "Cameras",
                "Laptops",
                "Books",
                "HeadPhones",
                "Home",
                "Food",
                "Sports",
            ],
            message:"please select correct category",
        },
    },
    seller:{
        type:String,
        required:[true,"please enter product seller"],
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true,
            },
            rating:{
                type:Number,
                required:true,
            },
            Comment:{
                type:String,
                required:true,
            },
        },
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:false,
    },

},{timestamps:true});

export default mongoose.model("Product",productSchema);