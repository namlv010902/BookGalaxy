import { deleteUser, getUsers, updateRole } from "../service/users.service"
import { IUser } from "../types/user"
import { useEffect, useState } from "react"
export const useUser = () => {
    const [user, setUser] = useState<IUser[]>()
    useEffect(() => {
        getUsers().then(({ data }) => {
            setUser(data.users)
        })
    }, [])
    console.log(user);
    const handleUpdateRole = (id: string, role: string) => {
        console.log(role);
        updateRole(id, { role }).then(({ data }) => {
            getUsers().then(({ data }) => {
                setUser(data.users)
            })
            alert(data.message)
        })
            .catch(({ response }) => {
                alert(response.data.message)
            })
    }
    const handleRemove = (id: string) => {
        if (window.confirm('Are you sure you want to remove')) {
            deleteUser(id).then(() => {
                getUsers().then(({ data }) => {
                    setUser(data.users)
                })
            })
        }
    }
    return { user, handleRemove, handleUpdateRole }
}