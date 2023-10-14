import User from "../models/users"
import jwt from "jsonwebtoken"
const authenticate = async (req, res, next) => {
  try {
    // check xem đăng nhập hay chưa
    if (!req.headers.authorization) {
      return res.status(401).json({
        message: "Please log in !"  
      })
    }
    // lấy token từ req header
    const token = req.headers.authorization.split(" ")[1]
    console.log(token);
    // verify token để lấy id user
    jwt.verify(token, "namle2002", async (err, payload) => {
      if (err) {
        if (err.name == "JsonWebTokenError") {
          return res.status(402).json({
            message: "Token is invalid"   // token ko hợp lệ
          })
        }
        if (err.name == "TokenExpiredError") {
          return res.status(403).json({
            message: "Token is expired"   // token hết hạn
          })
        }
      }
      const user = await User.findById(payload.id)
      console.log(user);
      req.user = user   //lưu lại thông tin người dùng trên req để sử dụng ở middleware khác
      next()
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message
    })
  }
}

export default authenticate