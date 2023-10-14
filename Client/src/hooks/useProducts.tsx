import { deleteProduct, getAll, paginateProduct } from "../service/products.service"
import { useStoreProducts } from "../store/hooks"
import { useEffect, useState } from "react"
export const useProducts=()=>{
    const { products, dispatch } = useStoreProducts()
   
    const [totalPage, setToTalPage] = useState(0)
    useEffect(() => {
      getAll().then(({ data }) => {
        dispatch({
          type: "GET_PRODUCTS",
          payload: data.product.docs
        })
        setToTalPage((data.product.totalPages) * 10)
      })
    }, [])
    const handlePageChange = (page: any) => {
      paginateProduct(page).then(({ data }) => {
        console.log(data);
        setToTalPage((data.product.totalPages) * 10)
        dispatch({
          type: 'GET_PRODUCTS',
          payload: data.product.docs
        })
      })
      console.log("Page hiện tại: " + page, "/Tổng page: " + totalPage);
    };
    const onHandleRemove = (id: string) => {
      if (window.confirm('Are you sure?')) {
        deleteProduct(id).then(() => {
          getAll().then(({ data }) => {
            dispatch({
              type: "GET_PRODUCTS",
              payload: data.product.docs
            })
            setToTalPage((data.product.totalPages) * 10)
            alert(data.message)
          })
          .catch(({response})=>{
            alert(response.data.message)
        })
        })
      }
    }
    return {products, totalPage, onHandleRemove, handlePageChange,dispatch}
}