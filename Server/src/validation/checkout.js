import joi from "joi"

export const checkout = joi.object({
    customerName:joi.string().required("Customer Name is required").empty("Customer Name does not empty"),
    phone:joi.string().required().empty().pattern(/^[0][0-9]{9}$/).messages({
        "any.required":"Phone Number is required",
        "string.empty":"Phone Number does not empty",
        "string.pattern":"Please enter a valid phone number",
    }),
    address:joi.string().required("Shipping Address is required").empty("Shipping Address does not empty"),
    
})
