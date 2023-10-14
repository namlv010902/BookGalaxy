
import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    productId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Products"
    }

}, { timestamps: true, versionKey: false });

export default mongoose.model("Favorite", favoriteSchema)