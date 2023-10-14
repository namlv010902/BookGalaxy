import Category from "../models/categories"
import Products from "../models/products"
import joi from "joi"
const categorySchema = joi.object({
    name:joi.string().required().trim()
})
export const createCategory = async (req, res) => {
    try {
        const {error} = categorySchema.validate(req.body, {abortEarly:false})
        if(error) return res.status(401).json({
            message:error.details.map(err => err.message)
        })
        const category = await Category.create(req.body)
        return res.status(201).json({
            message: "Create category successfully",
            category
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
export const updateCategory = async (req, res) => {
    try {
        const {error} = categorySchema.validate(req.body, {abortEarly:false})
        if(error) return res.status(401).json({
            message:error.details.map(err => err.message)
        })
        const category = await Category.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.status(201).json({
            message: "Update category successfully",
            category
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
export const removeCategories = async (req, res) => {
    try {
       const category = await Category.findOne({ _id: req.params.id });
    //    console.log(category.productId);
       const defaultCategoryId = "64dd906dd350fc836c462667"; //id Danh mục mặc định
       // ko cho phép xóa danh mục mạc định
       if(req.params.id == defaultCategoryId){
        return res.status(403).json({
            message:"Default category is not delete"
        })
       }
       // update lại id cate của các sản phẩm trong danh mục muốn xóa
       await Products.updateMany(
          { categoryId: category._id },
          { $set: { categoryId: defaultCategoryId } }
       );
       // thêm id của sản phẩm vào danh mục mạc định
       const defaultCate = await Category.findByIdAndUpdate(defaultCategoryId, {
          $push: { products: category.productId }
       },{new:true});
 
       await Category.findOneAndDelete({ _id: req.params.id });
       res.json({
          message: 'Delete category successfully',
          data: defaultCate
       });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
 };
export const getAllCategory = async (req, res) => {
    try {
        const category = await Category.find()
        return res.status(201).json({
            message: "Get all category successfully",
            category
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
export const getOneCategory = async (req, res) => {

    try {
        const category = await Category.findById(req.params.id)

        return res.status(201).json({
            message: "Get one category successfully",
            category,

        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
export const categoryProducts = async (req, res) => {
    const { _page = 1, _limit = 12 } = req.query
    const options = {
      page: _page,
      limit: _limit,
      populate: [{ path: 'brandId' }, { path: 'categoryId' }, { path: 'sizes.sizeId' }],

    }
    try {
      console.log(req.params.idCate);
      const products = await Products.paginate({ categoryId: req.params.idCate }, options)
      return res.status(201).json({
        message: "Get categoryP successfully",
        products
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }