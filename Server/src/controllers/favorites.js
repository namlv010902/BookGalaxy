import Favorite from "../models/favorites"

export const createFavorite=async(req, res)=>{
    try {
        const {productId} = req.body
        const userId = req.user._id
        console.log("user",userId);
        // check nếu sản phẩm đó đã tồn tại trong mục yêu thích của user thì xóa đi
        const existFv = await Favorite.findOne({productId, userId})
        if(existFv){
            await Favorite.deleteOne({productId, userId})
            return res.status(200).json({
                message: "Remove favorite successfully",
            })
        }
        const favorite = await Favorite.create({productId:req.body.productId, userId:userId})
        return res.status(201).json({
            message: "Add favorite successfully",
            favorite
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
export const getFavorite=async(req, res)=>{
    try {
        const favorite = await Favorite.find({productId:req.params.id}).populate("productId")
        return res.status(201).json({
            message: "Get favorite successfully",
            favorite
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}


export const getFavoriteUser=async(req, res)=>{
    try {
        const userId = req.user._id
        const favorites = await Favorite.find({userId:userId}).populate("productId")
        if(!favorites) return res.status(404).json({message:"User not found"})
        return res.status(201).json({
            message: "Get favorite successfully",
            favorites
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}