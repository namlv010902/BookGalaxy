import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"User"
    },
        productId:{
            type:mongoose.Types.ObjectId,
            required:true,
            ref:"Products"
        },
        
   content:{
    type:String,
    required:true

   }   

},{timestamps:true, versionKey:false});

export default mongoose.model("Comment", commentSchema)