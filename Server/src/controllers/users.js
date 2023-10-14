import User from "../models/users"

import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import joi from "joi"
import { schemaPassword } from "../validation/forgotPassword"
import { transporter } from "../config/mail"
import { validateChangePassword } from "../validation/changePassword"
dotenv.config()
export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    return res.status(201).json({
      message: "Get users successfully",
      users
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
}
export const updateRole = async (req, res) => {
  try {
    const users = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true })
    return res.status(201).json({
      message: "Update role successfully",
      users
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
}
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (user.role === 'admin') {
      return res.status(403).json({
        message: "Unauthorized",
      })
    }
    const users = await User.findByIdAndRemove(req.params.id, { new: true })
    return res.status(201).json({
      message: "Delete user successfully",
      users
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
}
export const updateProfile = async (req, res) => {
  try {

    const { email } = req.body
    const userId = req.user._id
    const allUser = await User.find()
    const user = await User.findOne({ _id: userId })
    const emailExits = allUser.find((item) => {
      return item.email == email && user.email != email
    })

    if (emailExits) {
      return res.status(401).json({
        message: "The Email was registered"
      })
    }
    const account = await User.findByIdAndUpdate(userId, req.body, { new: true })
    return res.status(201).json({
      message: "Update account successfully",
      account
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message
    })
  }
}
export const getProfile = async (req, res) => {
  try {
    const userId = req.user._id
    const user = await User.findById(userId)
    if (!user) {
      return res.status(401).json({
        message: "Account not found"
      })
    }

    return res.status(201).json({
      message: "Get profile successfully",
      user
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message
    })
  }
}
export const sendForgotPasswordEmail = async (req, res) => {
  try {
    console.log(process.env);
    const { email } = req.body
    // Trước khi gửi mail check xem mail này đã được đăng ký trong database chưa
    const exitsEmail = await User.findOne({ email: email })
    if (!exitsEmail) {
      return res.status(402).json({
        message: "Email not found!",
      });
    }

    // Tạo token theo email
    const token = await jwt.sign({ email: email }, 'namdeptrai', { expiresIn: '1h' });

    // Định nghĩa nội dung email
    const mailOptions = {
      from: 'namphpmailer@gmail.com',
      to: email,
      subject: 'Yêu cầu đặt lại mật khẩu',
      html: '<div> <img src="https://charmee-store-demo.myshopify.com/cdn/shop/files/logo.png?v=1613708277" /> <p style="font-size: 15px; color: #002140; font-weight: 500;">Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu của bạn. Nhập mã đặt lại mật khẩu sau đây:</p>' +
        '<p><strong style="font-size: 18px; color: blue;">' + token + '</strong></p></div>',
    }
    // Gửi email
    const result = await transporter.sendMail(mailOptions);
    console.log('Email gửi thành công:', result);
    return res.status(201).json({
      message: 'Send mail successfully',
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
};
// Check mã xác minh 
export const verifyTokenEmail = async (req, res) => {
  try {
    const { token } = req.body
    console.log(token);
    jwt.verify(token, "namdeptrai", async (err, payLoad) => {
      if (err) {
        if (err.name == "JsonWebTokenError") {
          return res.status(401).json({
            message: "Invalid verification code!!",
            //Token không hợp lệ
          });
        }
        if (err.name == "TokenExpiredError") {
          return res.status(402).json({
            message: "The verification code has expired", // token hết hạn
          });
        }
      }
      console.log(payLoad);

      const user = await User.findOne({ email: payLoad.email });
      if (!user) {
        return res.status(402).json({
          message: "User not found"
        });
      }
      return res.status(201).json({
        message: "Access token is valid",
        AccessToken: token
      })
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
};
//Quên mật khẩu => Đổi mật khẩu
export const forgotPassword = async (req, res) => {
  try {
    console.log(req.user);
    const { newPassword } = req.body;
    const { error } = schemaPassword.validate(req.body, { abortEarly: false })
    if (error) {
      return res.status(402).json({
        message: error.details.map(item => item.message)
      })
    }
    const hasPassword = await bcrypt.hash(newPassword, 10)
    const user = await User.findByIdAndUpdate(req.user._id, { password: hasPassword }, { new: true });
    user.password = undefined;
    return res.status(201).json({
      message: "Updated password successfully",
      user
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
};
export const changePassword = async (req, res) => {
  try {
    console.log(req.user);
    const { newPassword, oldPassword } = req.body;
    const { error } = validateChangePassword.validate(req.body, { abortEarly: false })
    if (error) {
      return res.status(402).json({
        message: error.details.map(item => item.message)
      })
    }
    //Kiểm tra mật khẩu cũ có đúng ko
    const passwordExist = await bcrypt.compare(oldPassword, req.user.password);
    if (!passwordExist) {
      return res.status(401).json({
        message: "Old password is incorrect"
      })
    }
    //Mật khẩu mới phải khác mật khẩu cũ
    if (newPassword == oldPassword) {
      return res.status(403).json({
        message: "New password must differ from old password"
      })
    }
    const hasPassword = await bcrypt.hash(newPassword, 10)
    const user = await User.findByIdAndUpdate(req.user._id, { password: hasPassword }, { new: true });
    user.password = undefined;
    return res.status(201).json({
      message: "Change password successfully",
      user
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
};

