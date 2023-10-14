import { Link } from 'react-router-dom';

import { Popover } from 'antd';
import { scrollToTop } from '../../service/config.service';
import { useCart } from '../../hooks/useCart';
const ProductInCart = () => {

    const  {cart, handleRemove} = useCart()
  let countProductInCart = cart?.products?.length || 0
  const showCart = (
    <div className='show-cart'>
      {cart?.products?.length > 0 ? <div>
        {cart?.products?.map((item: any) => (
          <div key={item._id}>
            <div className="productInCart" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginRight: "10px" }}>
              <Link  to={`product/${item.productId._id}`} className="item-cart">
                <div className="product-in-cart-image">
                  <img src={item.productId.image} alt="" />
                </div>
                <div className="product-in-cart">
                  <p style={{color:"#000",fontWeight:"600"}}>{item.productId.name}</p>
                  <strong id='price'>${item.price} </strong>
                  <p>( {item.sizeId.name} x {item.quantity} )</p>
                </div>
              </Link>
              <i style={{ cursor: "pointer" }} onClick={() => handleRemove(item._id)}
                className="fa-regular fa-circle-xmark"></i>
            </div>
          </div>
        ))}
        <strong id='priceTotal'>TotalPrice: ${cart?.totalPrice}</strong> <br />
        <Link onClick={()=>scrollToTop()} to="/cart"> <button className="btn-show-cart" >View cart</button></Link>
      </div> : <p style={{ textAlign: "center" }}> <i className="fa-regular fa-circle-exclamation"></i>Cart empty </p>
      }
    </div>
  )
  return (
    <div>
   <Popover content={showCart} placement="bottom" >
   <Link to="/cart" onClick={()=>scrollToTop()} id='dropCart'>  <i title='Giỏ hàng của bạn' className='fa fa-shopping-basket'></i> <p>{countProductInCart}</p> </Link></Popover>
    </div>
  )
}

export default ProductInCart