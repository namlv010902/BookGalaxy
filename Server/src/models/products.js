import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
const productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    author:{
        type:String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Categories"
    },
    publication_date:{
        type: String,
        required: true
    },
    stock:{
        type:Number,
        required: true
    },
    sold:{
        type:Number,
        default:0
    },
    discount:{
        type:Number,
        default:0
    }

}, { timestamps: true, versionKey: false });
productSchema.plugin(mongoosePaginate)
productSchema.index({ title: 'text' })
export default mongoose.model("Products", productSchema)
