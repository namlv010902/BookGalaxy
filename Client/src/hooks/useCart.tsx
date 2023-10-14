import { addToCart, getCart, removeProductInCart } from "../service/cart.service"
import { useStoreCart } from "../store/hooks"
import {useEffect} from "react"
import { toast } from 'react-toastify';
import { IProduct } from "../types/products";
type IProps = {
  product?: IProduct,
  productId?: string ,
  quantity: number,
  price: number,
  sizeId?: string,
  inStock: number
}
export const useCart =()=>{
  const { cart, dispatch } = useStoreCart()
 
 const accessToken = JSON.parse(localStorage.getItem("accessToken")!)
  useEffect(() => {
  if(accessToken){
    getCart().then(({data})=>{
        dispatch({
           type: "GET_CART",
           payload: data.cart
         })
     }) 
  } 
  }, [accessToken])
 
  // xóa 1 sp (.) giỏ hàng
  const handleRemove = (id: string) => {
    removeProductInCart(id);
    dispatch({
      type: "DELETE_PRODUCT_IN_CART",
      payload: id
    });
  }
  // thêm sp vào giỏ hàng
  const handleAddCart = (props: IProps) => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
    if (!accessToken) {
        toast.error('Please log in!', { autoClose: 1500 })
       return
        };
    //kiểm tra trường hợp nếu trong giỏ của user đã tồn tại sản phẩm đó tiếp tục thêm vượt quá tồn kho
    getCart().then(({ data }) => {
        dispatch({
            type: "GET_CART",
            payload: data.cart
        });
    })
    if (cart?.products) {
        const productExist = cart.products.find((item: any) => item.productId._id == props.product?._id && item.sizeId._id == props.sizeId)
        if (productExist) {
            if (props.quantity > (props.inStock - productExist.quantity)) {
               toast.error("Maximum quantity reached. You cannot add more items to your cart!")
                return
            }
        }
    }
    // check trường hợp người dùng cố tình xóa số lượng hoặ để số lượng về 0 rồi add cart
    if (!props.quantity || props.quantity == 0) {
       toast.error('Please check the quantity !')
        return
    }
    // và nếu đã chọn size thì mới add cart thành công

    if (props.sizeId) {
        const data = {
            productId: props.productId,
            price: props.price,
            quantity: props.quantity,
            sizeId: props.sizeId,
        }
        // console.log(data);
        addToCart(data).then(() => {
            getCart().then(({ data }) => {
                dispatch({
                    type: "GET_CART",
                    payload: data.cart
                });
            });
           toast.success('Add to Cart successfully', { autoClose: 1500 })
        })
            .catch(({ response }) => {
                alert(response.data.message);
            })
    } else {
       toast.error('Please choose a size !')
    }
}
   return {cart, handleRemove,dispatch,handleAddCart}
}