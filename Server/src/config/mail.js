import nodemailer from "nodemailer"
 // Tạo một transporter để kết nối với tài khoản email admin 
export const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'namphpmailer@gmail.com',
      pass: 'rhlacgylyyzpiczf'
    },
    authMethod: 'PLAIN'
  });