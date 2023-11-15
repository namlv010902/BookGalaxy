
import { ICate } from "./categories";
import { ISize } from "./size";
export interface IResSize{
    sizeId:ISize, 
    price:number,
    inStock:number,
    unitsSold:number
}
export interface IProduct{
    _id:string;
    title:string;
    image:string;
    description:string;
    publication_date:string;
    categoryId:ICate;
    discount:number,
    stock:number;
    price:number;
    author:string;
    sold:string
   
}