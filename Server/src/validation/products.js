import joi from "joi"

export const validateProduct = joi.object({
    title: joi.string().required().trim(),
    image: joi.string().required().trim(),
    price: joi.number().required(),
    stock: joi.number().required(),
    publication_date: joi.date().required(),
    description: joi.string().required().trim(),
    categoryId: joi.string().required().trim(),
    author: joi.string().required().trim(),

})
