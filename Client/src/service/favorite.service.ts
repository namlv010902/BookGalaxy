import { getAuthorizationHeaders, instance } from "./config.service"
const headers = getAuthorizationHeaders()
export const updateFavorite = (productId: string) => {
    return instance.post('favorite', {productId}, { headers })
}

export const getFavorite = (id: string) => {
    return instance.get('favorite/' + id)
}
export const getFavoriteUser = () => {
    return instance.get('favorite-user/' , { headers })
}