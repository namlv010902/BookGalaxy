import joi from "joi"

export const validateChangePassword = joi.object({
    oldPassword: joi.string().required().trim().min(6).messages({
        "any.required": "Trường oldPassword là bắt buộc",
        "string.empty": "Mật khẩu cũ ko được bỏ trống",
        "string.min": "TRường oldPassword ít nhất {#limit} ký tự"
    }),
    newPassword: joi.string().trim().required().min(6).messages({
        "any.required": "Trường newPassword là bắt buộc",
        "string.empty": "Mật khẩu mới ko được bỏ trống",
        "string.min": "Mật khẩu ít nhất {#limit} ký tự"
    }),
    confirmPassword: joi.string().trim().required().valid(joi.ref("newPassword")).messages({
        "any.required": "Trường confirmPassword là bắt buộc",
        "string.empty": "Xác minh mật khẩu ko được bỏ trống",
        "any.only": "Xác nhận mật khẩu ko khớp"
    })
})