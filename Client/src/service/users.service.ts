
import { getAuthorizationHeaders, instance } from "./config.service"
const headers = getAuthorizationHeaders()

export const sendMailer = (email: string) => {
    return instance.post('email', { email: email })
}
export const verifyTokenMailer = (token: string) => {
    return instance.post('verifyEmailToken', { token: token })
}
const tokenEmail = JSON.parse(localStorage.getItem('emailToken')!)
export const forgotPassword = (data: { newPassword: string, confirmPassword: string }) => {
    return instance.patch('forgotPassword', data, {
        headers: { 'Authorization': 'Bearer ' + tokenEmail }
    })
}
export const changePassword = (data:object) => {
    return instance.patch('changePassword', data,{ headers })
}
export const getUsers = () => {
    return instance.get('users')
}
export const updateRole = (id:string,data:{role:string}) => {
    return instance.patch('users/'+id,data,{headers})
}
export const deleteUser = (id:string) => {
    return instance.delete('users/'+id,{headers})
}