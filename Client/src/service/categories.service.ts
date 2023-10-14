
import { getAuthorizationHeaders, instance } from "./config.service"
const headers = getAuthorizationHeaders()
export const getCategories = () => {
    return instance.get('categories')
}
export const createCategory = (data:{name:string}) => {
    return instance.post('categories',data,{headers})
}
export const updateCategory = (id:string,data:{name:string}) => {
    return instance.patch('categories/'+id,data,{headers})
}
export const getCategory = (id: string) => {
    return instance.get('categories/' + id)
}
export const removeCategory = (id: string) => {
    return instance.delete('categories/' + id,{headers})
}

