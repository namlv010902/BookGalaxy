import { ISize } from "./size";

export interface ICartProduct {
    _id: string;
    productId: {
      _id: string;
      name: string;
      image: string;
    };
    price: number;
    quantity: number;
    sizeId:ISize;
  }
  
  export interface ICart {
    _id: string;
    useId: string;
    totalPrice?: number;
    products: ICartProduct[];
  }