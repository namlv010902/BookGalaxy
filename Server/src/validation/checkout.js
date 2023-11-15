import joi from "joi"

export const validateCheckout = joi.object({
    customerName:joi.string().required("Customer Name is required").empty("Customer Name does not empty"),
    email:joi.string().required().empty().email().trim(),
    phone:joi.string().required().empty().pattern(/^[0][0-9]{9}$/).trim(),
    address:joi.string().required("Shipping Address is required").empty("Shipping Address does not empty").trim(),
    note:joi.string().allow(""),
    products:joi.array().items({
        productId:joi.string().required().empty().trim(),
        productTitle:joi.string().required().empty().trim(),
        productImage:joi.string().required().empty().trim(),
        quantity:joi.number().required(),
        price:joi.number().required()
    }).required(),
    totalPayment:joi.number().required()

})
