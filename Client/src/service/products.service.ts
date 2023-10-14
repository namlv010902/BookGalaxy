import { getAuthorizationHeaders, instance } from "./config.service"
const headers = getAuthorizationHeaders()
export const getAll = () => {
    return instance.get('products')
}
export const getProduct = (id: string) => {
    return instance.get('product/' + id)
}
export const updateProduct = (id: string, data: any) => {
    return instance.patch('product/' + id, data, { headers })
}
export const createProduct = (data: any) => {
    return instance.post('product/', data, { headers })
}
export const deleteProduct = (id: string) => {
    return instance.delete('product/' + id, { headers })
}

export const getProductNew = () => {
    return instance.get('products/?_sort=createdAt&_order=desc&_limit=10')
}
export const getProductBest = () => {
    return instance.get('products/?_sort=createdAt&_order=asc&_limit=10')
}
export const sortProduct = (value: any) => {
    return instance.get('products/?_sort=name&_order=' + value)
}
export const searchProduct = (value: any) => {
    return instance.get('products/?_q=' + value)
}
export const paginateProduct = (value: any) => {
    return instance.get('products/?_limit=12&_page=' + value)
}
export const filterPrice = (min: number, max: number) => {
    const value = {
        minPrice: min,
        maxPrice: max
    }
    return instance.post('productFilterPrice/', value)
}
export const getCategoryProducts = (idCate: string) => {
    return instance.get('categoryProducts/' + idCate)
}

export const paginateCategoryProducts = (idCate: string, page: number) => {
    return instance.get(`categoryProducts/${idCate}?_limit=12&_page=` + page)

}




