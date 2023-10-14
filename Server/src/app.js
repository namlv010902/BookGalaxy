import express from "express";
import mongoose from "mongoose";
import categoryRouter from "./routers/categories"
import productRouter from "./routers/products"
import authRouter from "./routers/auth"
import cartRouter from "./routers/carts"
import orderRouter from "./routers/orders"
import commentRouter from "./routers/comments"
import favoriteRouter from "./routers/favorites"
import uploadRouter from "./routers/upload"
import userRouter from "./routers/users"

import cors from "cors"
const app = express();
app.use(cors())
app.use(express.json())
app.use("/api",categoryRouter)
app.use("/api",productRouter)
app.use("/api",authRouter)
app.use("/api",cartRouter)
app.use("/api",orderRouter)
app.use("/api",commentRouter)
app.use("/api",favoriteRouter)
app.use("/api",uploadRouter)
app.use("/api",userRouter)

mongoose.connect("mongodb://127.0.0.1:27017/BookGalaxy")
.then(()=>console.log("Connect success"))
.catch((error)=>console.log(error))
app.listen(8080)