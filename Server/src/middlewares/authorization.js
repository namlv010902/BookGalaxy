import jwt  from "jsonwebtoken";
import User from "../models/users"
export const checkPermissionAndAuth=async(req, res, next)=>{
    try {
        if(!req.headers.authorization){
            return res.status(401).json({
                message:"Bạn chưa đăng nhập"
            })
        }
        const token =req.headers.authorization.split(" ")[1]
        jwt.verify(token,"namle2002",async (err, payLoad) => {
            if (err) {
                if (err.name === "JsonWebTokenError") {
                    return res.status(401).json({
                        message: "Token không hợp lệ!",
                        
                    });
                }
                if (err.name === "TokenExpiredError") {
                    
                    return res.status(402).json({
                        message: "Token hết hạn",
                    });
                }
            }
            const user = await User.findById(payLoad.id);
            console.log(user);
            // kiểm tra xem user có đủ quyền để thực hiện hành động đó không
            if (user.role !== "admin") {
                return res.status(403).json({
                    message: "Bạn không có quyền để thực hiện hành động này",
                });
            }
            // lưu thông tin user vào request để sử dụng trong các middleware khác
            req.user = user;
            next();
        });  
        
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}
