import express  from "express";
import { createComment, getCommentProduct, getComments, removeComment } from "../controllers/comments";
import authenticate from "../middlewares/authenticate";
import {checkPermissionAndAuth} from "../middlewares/authorization"
const router = express.Router()

router.post("/comment",authenticate,createComment)
router.get("/comment/:idProduct",getCommentProduct)
router.delete("/comment/:id",checkPermissionAndAuth,removeComment)
router.get("/comments/",getComments)


export default router