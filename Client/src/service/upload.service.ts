import { instance } from "./config.service"

export const upLoadImg = (formData: any) => {
    return instance.post("upload", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}