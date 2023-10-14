import { Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCategoryProducts, getProduct } from '../../../service/products.service';
import ShowComment from '../../../components/comment/Comment';
import { IProduct } from '../../../types/products';
import './DetailProduct.css';
import Products from '../../../components/products/Products';
import { useCart } from '../../../hooks/useCart';
import useFavorite from '../../../hooks/useFavorite';
import { IFavorite } from '../../../types/favorite';
const DetailProduct = () => {
  const [show, setShow] = React.useState(false)
  const [product, setProduct] = useState<IProduct>()
  const [relatedProducts, setRelatedProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { id } = useParams()
  const { handleAddCart } = useCart()
  const { addOrRemoveFavorite,favorites } = useFavorite()
  const productFvExist = favorites.find((item: IFavorite) => item.productId._id === product?._id);
  useEffect(() => {
    if (id) {
      getProduct(id).then(({ data }) => {
        setProduct(data.product)
        setIsLoading(false)
      }
      )
      .catch(() => {
          setIsLoading(false)
        })
    }
  }, [id])
  const categoryId = product?.categoryId._id
  useEffect(() => {
    if (categoryId) {
      getCategoryProducts(categoryId).then(({ data }) => setRelatedProducts(data.products.docs))
    }
  }, [categoryId])
  
  const dataComment = {
    productId: product?._id
  }
  const ShowDesc = () => {
    return (
      <div>
        <p>{product?.description}</p>
      </div>
    )
  }
  // update lại số lượng khi click nút - +
  const updateQuantity = (value: any) => {
    // if (value == "increase") {
    //   if (stock) {
    //     if (quantity >= stock) {
    //       setQuantity(stock)
    //       return
    //     }
    //   }
    //   setQuantity(quantity + 1)
    // } else {
    //   setQuantity(quantity - 1)
    //   if (quantity == 1) {
    //     setQuantity(1)
    //   }
    // }
  }

  // update số lượng khi onChannge
  const handleChangeQuantity = async (quantity: any) => {
    // if (stock) {
    //   if (quantity >= stock) {
    //     setQuantity(stock)
    //     return
    //   }
    // }
    setQuantity(parseInt(quantity))
  }
  // add to cart
  const onAddCart = () => {
    // handleAddCart({
    //   product,
    //   productId: id,
    //   quantity,
    //   price,
    //   sizeId,
    //   stock:product?.stock
    // })
  }
  //Thêm or xóa sản phẩm vào yêu thích
  // => backend đã check sp yêu thích theo idUser từ request lúc đăng nhập vào
  const handleFavorite = () => {
    if(!JSON.parse(localStorage.getItem("accessToken")!)){
      toast.error("Please login !",{autoClose:1500})
      return
    }
    id && addOrRemoveFavorite(id)
  }

  return (
    <div style={{ minHeight: "80vh" }}>
      <ToastContainer></ToastContainer>
      {isLoading ? <div style={{ textAlign: "center" }}><img src="https://media1.giphy.com/media/kUTME7ABmhYg5J3psM/giphy.gif?cid=ecf05e47m4ti25gg5zz2if8kxnefsg9lo7nx4cuf5fprvtsa&ep=v1_gifs_search&rid=giphy.gif&ct=g" /> </div> :
        <div>
          {product ?
            <div className="detail-main">
              <div className="detailProduct">
                <div className="detailProduct-image" style={{ position: "relative" }}>
                  <Image id='main-img' src={product?.image} alt="" />
                  {/* {stock == 0 && <img style={{ width: "150px", position: "absolute", top: "0", left: "0" }} src="https://www.pngkey.com/png/full/118-1182729_out-of-stock-contemporary-human-resource-management-by.png" alt="" />} */}
                  <div className="heart-share">
                    <p id="share">Share:
                      <img src="https://res.cloudinary.com/dgqvtbr4n/image/upload/v1688562185/fb-removebg-preview_s627uf.png" alt="" />
                    </p>
                    <div className="heart">
                     {productFvExist ? <i style={{color:"#f12"}} onClick={() => handleFavorite()} className="fa fa-heart" aria-hidden="true"></i> : <i onClick={() => handleFavorite()} className="fa fa-heart-o" aria-hidden="true"></i> }
                    </div>
                  </div>
                </div>
                <div className="detailInfo">
                  <h1 >{product?.title}</h1>
                  <hr />
                  <h3 id='priceDetail' >${product.price}</h3>
                  <p>Category <span>{product?.categoryId?.name}</span></p>
                  <p>Author <span>{product?.author}</span></p>
                  <p>Description <br />
                    <span>{product?.description}</span>
                  </p>
                
                  <div style={{ display: "flex", justifyContent: "space-between", paddingRight: "150px" }}>
                    <p>Stock
                      <span> {product.stock}</span>
                    </p>
                    
                  </div>
                  <p id='quantity' >Quantity  <div id='form-add-cart'>
                    <p onClick={() => updateQuantity("decrease")}>-</p><input type="number" min={1} max={10} value={quantity} onChange={(e) => handleChangeQuantity(e.target.value)} /> <p onClick={() => updateQuantity("increase")} >+</p>
                  </div> </p>
                  <button disabled={product.stock == 0} onClick={() => onAddCart()} className={10 > 0 ? 'addCart' : 'cartDisabled'}><i className="fa fa-cart-plus" aria-hidden="true"></i>ADD TO CART</button>
                </div>
              </div>
              <div className="desc" >
                <button className='btn-primary' onClick={() => setShow(false)}>Description</button>
                <button className='btn-primary' onClick={() => setShow(true)}>Comment</button>
                <div className="showDescOrComment" >
                  {show ? <ShowComment data={dataComment} idProduct={id || ''} /> : <ShowDesc />}
                </div>
              </div>
              <div className="title" >
                <div className="title-child"><h1>Related products</h1></div>
              </div>
              <div className="products">
                {relatedProducts?.map((item: any, index: number) => (
                  <Products product={item} key={index}></Products>
                ))}
              </div>
            </div>
            : <div className='exist' style={{ marginTop: "100px" }} >
              <img src="https://i.pinimg.com/564x/7c/f6/24/7cf6247aa5499759fded5f256ab65a53.jpg" alt="" />
              <h2 >Product does not exist</h2>
            </div>
          }
        </div>}
    </div>
  )
}

export default DetailProduct