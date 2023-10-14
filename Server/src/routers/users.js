import express  from "express";
import {  forgotPassword, sendForgotPasswordEmail, verifyTokenEmail, updateProfile, changePassword, getProfile, getUsers, updateRole, deleteUser  } from "../controllers/users";
import { authenticateEmailToken } from "../middlewares/verifyEmailToken";
import authenticate from "../middlewares/authenticate";
import { checkPermissionAndAuth } from "../middlewares/authorization";

const router = express.Router()

router.patch("/profile",authenticate,updateProfile)
router.get("/profile/",authenticate,getProfile)
router.post("/email",sendForgotPasswordEmail)
router.post("/verifyEmailToken",verifyTokenEmail)
router.patch("/forgotPassword",authenticateEmailToken, forgotPassword)
router.patch("/changePassword",authenticate, changePassword)
router.get("/users", getUsers )
router.patch("/users/:id", checkPermissionAndAuth,updateRole )
router.delete("/users/:id", checkPermissionAndAuth,deleteUser )

export default router