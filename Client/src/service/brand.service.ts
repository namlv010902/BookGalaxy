import { IBrand } from "../types/brand"
import { instance } from "./config.service"

export const getBrands = () => {
    return instance.get('brand')
}
export const createBrand = (data:IBrand) => {
    return instance.post('brand',data)
}
export const removeBrand = (id:string) => {
    return instance.delete('brand/'+id)
}
export const getProductsByBrand=(id:string)=>{
    return instance.get("brand/"+id)
}