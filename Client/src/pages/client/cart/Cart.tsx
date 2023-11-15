import { InputNumber } from 'antd';
import './cart.css';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect,useState } from "react";
import { scrollToTop } from '../../../service/config.service';
import { getCart, updateCart } from '../../../service/cart.service';
import { ICart } from '../../../types/cart';
import { useCart } from '../../../hooks/useCart';
import { getProduct } from '../../../service/products.service';
import { IProduct } from '../../../types/products';


const Cart = () => {
  const [cart, setCart] = useState<ICart[]>(JSON.parse(localStorage.getItem('cart') || '[]'));
  const [product, setProduct] = useState<IProduct>()
  const updateQuantity = async (quantity: number, id: string) => {
    getProduct(id).then(({data})=>{
      setProduct(data.product);
    })
   if(product){
    if(quantity > product?.stock){
      alert("Product quantity is out of range")
      return
    }
   }
    const updateCart = cart.map((item:ICart)=>{
      if(item.productId === id){
        if(quantity % 1 == 0){
          item.quantity = quantity
        } 
      }
      return item
    })
    localStorage.setItem('cart', JSON.stringify(updateCart))
    setCart(updateCart)
  };
  const removeProduct=(productId:string)=>{
    const updateCart = cart.filter((item:ICart)=> item.productId != productId)
    localStorage.setItem('cart', JSON.stringify(updateCart))
    setCart(updateCart)
  }
  return (
    <div>
      <ToastContainer></ToastContainer>
      <div className="cart-main">
        {cart?.length > 0 ? (
          <div id="show-cart">
            <h3>Shopping Bag</h3>
            <table id='cart'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Sum</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart?.map((item: ICart,index:number) => {
                  let sum = item?.price * item?.quantity;
                  // console.log(item);
                  
                  return (
                    <tr key={index}>
                      <td>{item?.productTitle}<p style={{ color: "#015E6B", fontWeight: "bold" }}></p></td>
                      <td><Link to={`/product/${item?.productId}`} ><img src={item?.productImage} alt="" height={70} /></Link></td>
                      <td style={{ color: "#fca120" }}> ${item?.price}</td>
                      <td>
                        <InputNumber
                         
                          min={1}
                          value={item?.quantity}
                          onChange={(quantity) => typeof quantity === "number" && updateQuantity(quantity, item?.productId,)}
                        />
                      </td>
                      <td>${sum}</td>
                      <td>
                        <button className='btn-removeCart' onClick={()=>removeProduct(item.productId)} >
                          <i className="fa-regular fa-circle-xmark"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div id="checkout">
              <h3>TotalPrice:</h3>
              <Link to="/checkout">
                <button onClick={()=>scrollToTop()}>Checkout</button>
              </Link>
            </div>
          </div>
        ) : (
          <div className='cart-err'>
            <img src="https://bizweb.dktcdn.net/100/331/465/themes/684469/assets/empty-bags.jpg?1541753997372" alt="" /> <br />
            <Link to="/products">
              <Button onClick={() => scrollToTop()}>GO TO WHICH SHOP?</Button>
            </Link>
          </div>
        )}      </div>
    </div>
  );
};

export default Cart;