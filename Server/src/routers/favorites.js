import express  from "express";
import authenticate from "../middlewares/authenticate"
import {  createFavorite, getFavorite, getFavoriteUser} from "../controllers/favorites";

const router = express.Router()

router.post("/favorite",authenticate,createFavorite)
router.get("/favorite/:id",getFavorite)
router.get("/favorite-user/",authenticate,getFavoriteUser)

export default router