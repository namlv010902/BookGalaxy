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
        type: mongoose.Schema.Types.Date,
        required: true
    },
    stock:{
        type:Number,
        required: true
    }

}, { timestamps: true, versionKey: false });
productSchema.plugin(mongoosePaginate)
productSchema.index({ name: 'text' })
export default mongoose.model("Products", productSchema)
