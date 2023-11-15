import Comment from "../models/commentRate";
export const createComment =async(req, res)=>{
 try {
     req.body["userId"] = req.user._id
    const comment = await Comment.create(req.body)
    return res.status(200).json({
        message:"Comment created",
        comment
    })
 } catch (error) {
    return res.status(400).json({
        message: error.message, 
      });
 }

}
export const getCommentRate = async (req, res) => {
    try {
        const data = await Comment.findOne({ productId: req.query.productId,orderId:req.query.orderId }).populate("userId").populate("productId")
      
        return res.status(200).json({
            message: "Get commentRate successfully",
            data
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}
export const getCommentProduct =async(req, res)=>{
    try {
       const comment = await Comment.find({productId: req.params.idProduct}).populate("userId").populate("productId")
       return res.status(200).json({
           message:"Get comment successfully",
           comment
       })
    } catch (error) {
       return res.status(400).json({
           message: error.message, 
         });
    }
   }
   export const getComments =async(req, res)=>{
    try {
       const comment = await Comment.find().populate("userId").populate("productId")
       return res.status(200).json({
           message:"Get comments successfully",
           comment
       })
    } catch (error) {
       return res.status(400).json({
           message: error.message, 
         });
    }
   }
   export const removeComment =async(req, res)=>{
    try {
       const comment = await Comment.findByIdAndDelete(req.params.id).populate("userId").populate("productId")
       return res.status(200).json({
           message:"Delete comment successfully",
       })
    } catch (error) {
       return res.status(400).json({
           message: error.message, 
         });
    }
   }