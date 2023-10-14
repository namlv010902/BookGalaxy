import React, { useReducer } from "react";
import {  CartContext, CategoryContext, CommentContext, FavoriteContext, OrderContext, ProductContext, UserContext } from "./context";
import {  cartReducer, categoryReducer, commentReducer, favoriteReducer, initCart, initCategory, initComment, initFavorite, initOrder, initProducts, initUser, orderReducer, productReducer, userReducer } from "./reducer";
type IProps = {
    children?: React.ReactNode
}
export const CartProvider = ({ children }: IProps) => {
    const [cart, dispatch] = useReducer(cartReducer, initCart)
    return <CartContext.Provider value={{ cart, dispatch }} >{children}</CartContext.Provider>
}
export const CommentProvider = ({ children }: IProps) => {
    const [comments, dispatch] = useReducer(commentReducer, initComment)
    return <CommentContext.Provider value={{ comments, dispatch }} >{children}</CommentContext.Provider>
}
export const OrderProvider = ({ children }: IProps) => {
    const [orders, dispatch] = useReducer(orderReducer, initOrder)
    return <OrderContext.Provider value={{ orders, dispatch }} >{children}</OrderContext.Provider>
}
export const UserProvider = ({ children }: IProps) => {
    const [user, dispatchUser] = useReducer(userReducer, initUser)
    return <UserContext.Provider value={{ user, dispatchUser }} >{children}</UserContext.Provider>
}
export const CategoryProvider = ({ children }: IProps) => {
    const [categories, dispatch] = useReducer(categoryReducer, initCategory)
    return <CategoryContext.Provider value={{ categories, dispatch }} >{children}</CategoryContext.Provider>
}
export const FavoriteProvider = ({ children }: IProps) => {
    const [favorites, dispatch] = useReducer(favoriteReducer, initFavorite)
    return <FavoriteContext.Provider value={{ favorites, dispatch }} >{children}</FavoriteContext.Provider>
}
export const ProductProvider = ({ children }: IProps) => {
    const [products, dispatch] = useReducer(productReducer, initProducts)
    return <ProductContext.Provider value={{ products, dispatch }} >{children}</ProductContext.Provider>
}
