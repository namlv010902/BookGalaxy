import { useNavigate } from "react-router-dom"
import { useStoreCart, useStoreUser } from "../store/hooks"

export const useAuth =()=>{
    const { dispatch } = useStoreCart()
    const {  dispatchUser } = useStoreUser()
    const navigate = useNavigate()
    const handleLogout = ()=>{
        localStorage.removeItem('accessToken')
        dispatch({
          type: 'DELETE_ALL_PRODUCTS_IN_CART'
        })
        dispatchUser({
          type: 'GET_PROFILE',
        })
        navigate('/auth/login')
    }
    return {handleLogout}
}