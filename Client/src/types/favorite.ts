import { IProduct } from "./products";

export interface IFavorite{
    _id:string,
    userId:string,
    productId:IProduct
}