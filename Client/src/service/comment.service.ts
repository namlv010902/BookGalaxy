import { getAuthorizationHeaders, instance } from "./config.service"

const headers = getAuthorizationHeaders()
export const createComment = (data: any) => {
    return instance.post("comment", data,{headers})
}
export const deleteComment = (id: string) => {
    return instance.delete("comment/" +id,{headers})
}
export const getCommentProduct = (idProduct: string) => {
    return instance.get("comment/" + idProduct)
}
export const getComments = () => {
    return instance.get("comments")
}