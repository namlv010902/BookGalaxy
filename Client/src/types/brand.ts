import { IProduct } from "./products";

export interface IBrand{
    _id:string,
    name:string,
    productId:IProduct[]
}