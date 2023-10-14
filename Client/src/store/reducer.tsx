
import { ICart } from "../types/cart";
import { ICate } from "../types/categories";
import { IComment } from "../types/comment";
import { IFavorite } from "../types/favorite";
import { IOrder } from "../types/order";
import { IProduct } from "../types/products";

import { IUser } from "../types/user";

export const initCart: ICart = {
    _id: "",
    useId: "",
    totalPrice: 0,
    products: []
};
export const cartReducer = (state: ICart, action: { type: string; payload: ICart }): ICart => {
    // console.log("running cart...", state);
    // console.log(action.payload);
    switch (action.type) {
        case 'GET_CART':
            return action.payload
        // case 'POST_CART':
        //     return [...state, {...action.payload}];
        case 'DELETE_PRODUCT_IN_CART':
            const product = state.products.find((p: any) => p._id === action.payload)
            const updatedProducts = state.products.filter((item: any) => item._id !== action.payload);
            const updateTotalPrice = (state.totalPrice && product) && state.totalPrice - product.price * product.quantity
            return {
                ...state,
                products: updatedProducts,
                totalPrice: updateTotalPrice
            }

        case 'DELETE_ALL_PRODUCTS_IN_CART':
            return {
                ...state,
                products: []
            };
        default: return state
    }
}
export const initComment: IComment[] = []
export const commentReducer = (state: IComment[], action: { type: string, payload: IComment[] }) => {
    // console.log("running comment...", state);
    // console.log("payload...", action.payload);
    switch (action.type) {
        case 'GET_COMMENTS':
            return action.payload
        // case 'POST_COMMENT':
        //     return [...state, {...action.payload}];

        default: return state
    }
}
export const initOrder: IOrder[] = []
export const orderReducer = (state: IOrder[], action: { type: string, payload: IOrder[] }) => {
    console.log("running orders...", state)
    switch (action.type) {
        case 'GET_ORDERS':
            return action.payload
        case 'USER_GET_ORDERS':
            return action.payload
        case 'USER_FILTER_ORDERS':
            console.log(action.payload);
            const initState = [...state]
            const { userId, status } = action.payload[0];
            const filteredOrders = initState.filter(item => item.userId === userId && item.status === status);
            return filteredOrders;
        // case 'USER_CANCEL_ORDER':
        //     return action.payload
        // case 'POST_ORDER':
        //     return [...state, { ...action.payload }];

        default: return state
    }
}
export const initUser: IUser[] = []
export const userReducer = (state: IUser[], action: { type: string, payload: IUser[] }) => {
    console.log("running IUser...", state)
    switch (action.type) {
        case 'GET_USERS':
            return action.payload
        case 'GET_PROFILE':
            return action.payload
        case 'UPDATE_PROFILE':
            return action.payload
        default: return state
    }
}

export const initCategory: ICate[] = []

export const categoryReducer = (state: ICate[], action: { type: string, payload: ICate[] }) => {
    console.log("running cate...", state)
    switch (action.type) {
        case 'GET_CATEGORIES':
            return action.payload
        default: return state
    }
}
export const initFavorite: IFavorite[] = []

export const favoriteReducer = (state: IFavorite[], action: { type: string, payload: IFavorite[] }) => {
    console.log("running favorite...", state)
    switch (action.type) {
        case 'GET_FAVORITES_USER':
            return action.payload
        // case 'UPDATE_FAVORITE_USER':
        //     return action.payload
        default: return state
    }
}

export const initProducts: IProduct[] = []

export const productReducer = (state: IProduct[], action: { type: string, payload: IProduct[] }) => {
    console.log("running product...", state)
    switch (action.type) {
        case 'GET_PRODUCTS':
            return action.payload

        default: return state
    }
}
