import { Link } from "react-router-dom"
import { IProduct } from "../../types/products"
import { scrollToTop } from "../../service/config.service"
import { useState } from "react"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from 'antd';
import { useCart } from "../../hooks/useCart"
interface IProps {
  product: IProduct,
}
const Products = (props: IProps) => {

  const { handleAddCart } = useCart()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleAddToCart = () => {
    const data = {
      product: props.product,
      productId: props.product._id,
      quantity: 1,

    }

  }
  

  const discount = props.product.price - (props.product.price * props.product.discount / 100)

  return (

    <div className="colum" key={props.product._id}><ToastContainer></ToastContainer>
      <div className="image">
        <img id="productImage" src={props.product.image} alt="" />
      </div>
      <div className="content">
        <p><Link onClick={() => scrollToTop()} to={`/product/${props.product._id}`}>{props.product.title}</Link> </p>
        <p className="author">{props.product.author}</p>
        <div className="discount" style={{display:"flex",justifyContent:"space-between"}}>
          <strong>${discount} </strong>  {props.product.discount > 0 && <del>${props.product.price}</del>}
        </div>
       <button onClick={()=>setIsModalOpen(true)}>VIEW</button>
      </div>
      <Modal title={props.product.title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div style={{ display: "flex", margin: "15px 0" }}>
          <div className="modal-left">
            <p>
              <img height={120} src={props.product.image} alt="" />
            </p>
          </div>
          <div className="modal-right" style={{ marginLeft: "50px" }}>
            <p style={{ color: "#f12", fontWeight: "bold" }}>${props.product.price} </p>
            <p>Category: {props?.product?.categoryId?.name}</p>
            <p>Author: {props?.product?.author}</p>
            <p>Date: {props?.product?.publication_date}</p>
          </div>
        </div>
        <p>{props.product.description}</p>
      </Modal>

    </div>

  )
}

export default Products