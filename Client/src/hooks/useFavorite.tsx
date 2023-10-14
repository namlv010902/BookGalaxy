import { getFavoriteUser, updateFavorite } from "../service/favorite.service";
import { toast } from 'react-toastify';
import { useStoreFavorite } from "../store/hooks";
import {useEffect} from "react"
const useFavorite = () => {
    const { favorites, dispatch } = useStoreFavorite()
    useEffect(()=>{
        getFavoriteUser().then(({ data }) => {
            dispatch({
                type: 'GET_FAVORITES_USER',
                payload: data.favorites,
            })
        })
    },[])
    const addOrRemoveFavorite = (productId: string) => {
   
        const accessToken = JSON.parse(localStorage.getItem("accessToken")!)
        if (!accessToken) {
            toast.error('Please log in!')
            return
        }
        try {
            updateFavorite(productId).then(() => {
                getFavoriteUser().then(({ data }) => {
                    dispatch({
                        type: 'GET_FAVORITES_USER',
                        payload: data.favorites,
                    })
                })
                // toast.success(data.message)
            })

        } catch (error) {
            alert(error)
        }
    }
    return { addOrRemoveFavorite, favorites }


}
export default useFavorite