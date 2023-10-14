import { IProduct } from "./products";
import { IUser } from "./user";

export interface IComment{
    _id:string,
    content:string,
    userId:IUser,
    productId:IProduct,
    createdAt:Date

}