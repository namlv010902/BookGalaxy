import express from "express";
import { addToCart, getCartUser, removeOneProductInCart, updateCartItemQuantity } from "../controllers/carts";
import authenticate from "../middlewares/authenticate";

const router = express.Router()

router.post("/cart", authenticate, addToCart)
router.patch("/cart/:id", authenticate, updateCartItemQuantity)
router.post("/cart/:id", authenticate, removeOneProductInCart)
router.get("/cart", authenticate,getCartUser)

export default router