import { ISize } from "../types/size"
import { getAuthorizationHeaders, instance } from "./config.service"
const headers = getAuthorizationHeaders()
export const getSizes=()=>{
    return instance.get("size")
}
export const createSize=(data:ISize)=>{
    return instance.post("size",data,{headers})
}
export const removeSize=()=>{
    return instance.delete("size",{headers})
}
export const getProductsBySize=(id:string)=>{
    return instance.get("size/"+id)
}