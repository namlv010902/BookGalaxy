import express from "express";
import { cancelOrder, createOrder, filterOrders, getAdminOrders, getOrderDetail, getUserOrders, updateOrder } from "../controllers/orders";
import authenticate from "../middlewares/authenticate"
import {checkPermissionAndAuth} from "../middlewares/authorization"
const router = express.Router()

router.post("/order", authenticate, createOrder)
router.get("/orderUser/", authenticate, getUserOrders)
router.get("/order-admin", getAdminOrders)
router.get("/order/:id", authenticate, getOrderDetail)
router.patch("/order/:id", checkPermissionAndAuth, updateOrder)
router.delete("/order/:id", authenticate, cancelOrder)
router.post("/orderFilter/",authenticate, filterOrders)

export default router