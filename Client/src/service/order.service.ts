
import { IOrder } from "../types/order"
import { getAuthorizationHeaders, instance } from "./config.service"
const headers = getAuthorizationHeaders()
export const ADgetOrders = () => {
    return instance.get('order-admin/')
}
export const createOrder = (data: any) => {
    return instance.post('order/', data, { headers })
}
export const getUserOrder = () => {
    return instance.get('orderUser/', { headers })
}
export const filterOrder = (status: string) => {
    return instance.post('orderFilter/' , { status: status })
}
export const orderDetail = (id: string) => {
    return instance.get('order/' + id, { headers })
}
export const cancelOrder = (id: string) => {
    return instance.delete('order/' + id, { headers })
}
export const resetOrder = (id: string) => {
    return instance.post('order/' + id)
}
export const getOrders = () => {
    return instance.get('order/')
}
export const ADUpdateOrder = (id:string,data:IOrder) => {
    return instance.patch('order/'+id,data,{headers})
}

