import { IProduct } from "./products";

export interface IOrder{
    _id:string,
    cartId:string,
    userId:string,
    customerName:string,
    products:IProduct[],
    OrderDate:Date,
    pay:boolean,
    DeliveryDate:string,
    status:string,
    totalPrice:number,
    phone:string,
    note:string,
    address:string,
    createdAt:any  //date

}