import express  from "express";
import { getAllUser, login, register } from "../controllers/auth";

const router = express.Router()

router.post("/auth/register",register)
router.get("/user",getAllUser)
router.post("/auth/login",login)

export default router