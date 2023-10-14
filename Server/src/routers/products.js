import express from "express";
import { createProduct, filterPrice, getAllProduct, getOneProduct, removeProduct, updateProduct } from "../controllers/products";
import { checkPermissionAndAuth } from "../middlewares/authorization";

const router = express.Router()
router.post("/product", createProduct)
router.patch("/product/:id", checkPermissionAndAuth, updateProduct)
router.get("/products", getAllProduct)
router.get("/product/:id", getOneProduct)
router.delete("/product/:id", checkPermissionAndAuth, removeProduct)
router.post("/productFilterPrice/", filterPrice)




export default router