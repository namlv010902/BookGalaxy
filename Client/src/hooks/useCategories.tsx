import { getCategories, removeCategory } from "../service/categories.service"
import { useStoreCategory } from "../store/hooks"
import {useEffect} from "react"
export const useCategories=()=>{
    const { categories, dispatch } = useStoreCategory()
    useEffect(() => {
        getCategories().then(({ data }) => {
            dispatch({
                type: "GET_CATEGORIES",
                payload: data.category
            })
        })
    }, [])
    const onHandleRemove = (id: string) => {
        console.log(id);
        if (window.confirm("Are you sure you want")) {
            removeCategory(id).then(({ data }) => {
                getCategories().then(({ data }) => {
                    dispatch({
                        type: "GET_CATEGORIES",
                        payload: data.category
                    })
                })
                alert(data.message)
            })
                .catch(({ response }) => {
                    alert(response.data.message)
                })
        }
    }
    return {categories, onHandleRemove}
}