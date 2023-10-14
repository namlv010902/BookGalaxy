import joi from "joi"
export const schemaPassword = joi.object({
    newPassword: joi.string().trim().required().min(6).messages({
      "any.required": "Trường newPassword là bắt buộc",
      "string.empty": "Mật khẩu ko được bỏ trống",
      "string.min": "Mật khẩu ít nhất {#limit} ký tự"
    }),
    confirmPassword: joi.string().trim().required().valid(joi.ref("newPassword")).messages({
      "any.required": "Trường confirmPassword là bắt buộc",
      "string.empty": "Xác minh mật khẩu ko được bỏ trống",
      "any.only": "Xác nhận mật khẩu ko khớp"
    })
  })