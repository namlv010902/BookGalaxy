import express  from "express";
import { categoryProducts, createCategory, getAllCategory, getOneCategory,removeCategories,updateCategory } from "../controllers/categories";
import { checkPermissionAndAuth } from "../middlewares/authorization";
const router = express.Router()

router.post("/categories",createCategory)
router.patch("/categories/:id",checkPermissionAndAuth,updateCategory)
router.delete("/categories/:id",checkPermissionAndAuth,removeCategories)
router.get("/categories",getAllCategory)
router.get("/categories/:id",getOneCategory)
router.get("/categoryProducts/:idCate", categoryProducts)
export default router