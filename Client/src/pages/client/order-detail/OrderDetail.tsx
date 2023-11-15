
import { useState, useEffect } from "react"
import "./OrderDetail.css"
import { Link, useParams } from "react-router-dom"
import { cancelOrder, orderDetail } from "../../../service/order.service"
import { IOrder } from "../../../types/order"
import { Button, Modal, Rate } from 'antd';
import { createComment } from "../../../service/comment.service"
import { scrollToTop } from "../../../service/config.service"
const OrderDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams()
  const [detailOrder, setDetailOrder] = useState<IOrder>()
  const [remainingTime, setRemainingTime] = useState()
  const [content, setContent] = useState<String>("")
  const [productId, setProductId] = useState<String>("")
  useEffect(() => {
    if (id) {
      orderDetail(id).then(({ data }) => {
        setDetailOrder(data.order)
        setRemainingTime(data.remainingTimeMessage)
      })
    }
  }, [])
  const [star, setStar] = useState(3)
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

  const handleOk = () => {
    setIsModalOpen(false);
  };



  var checkTime = new Date(detailOrder?.createdAt);
  var outTime = checkTime.toLocaleString();
  // console.log(outTime);
  // console.log(remainingTime);
  const handleCancel = (id: string) => {
    cancelOrder(id).then(({ data }) => {
      setDetailOrder(data.order)
      setRemainingTime(data.remainingTimeMessage)
    })

  }
  
 const handleSubmit = (e:any) => {
  e.preventDefault()
  const data ={
    star,
    content,
    productId,
    orderId:id
  }
  createComment(data).then(()=>{
    alert("Comment created successfully")
    setIsModalOpen(false);
  })
 console.log(data);
 
 }

  return (
    <div>

      <div className="order-main">
        {detailOrder ?
          <div>
            <h2 className="order-title">Order details</h2>
            <div className="order-info">
              <div className="order-info-item">
                <span className="info-item-label">Invoice ID:</span>
                <span className="info-item-value">{detailOrder?._id}</span>
              </div>
              <div className="order-info-item">
                <span className="info-item-label">CustomerName:</span>
                <span className="info-item-value">{detailOrder?.customerName}</span>
              </div>
              <div className="order-info-item">
                <span className="info-item-label">Phone :</span>
                <span className="info-item-value">{detailOrder?.phone}</span>
              </div>
              <div className="order-info-item">
                <span className="info-item-label">Shipping address:</span>
                <span className="info-item-value">{detailOrder?.address}</span>
              </div>
              <div className="order-info-item">
                <span className="info-item-label">Note:</span>
                <span className="info-item-value">{detailOrder?.note}</span>
              </div>
              <div className="order-info-item">
                <span className="info-item-label">Order date:</span>
                <span className="info-item-value">{outTime}</span>
              </div>
              <div className="order-info-item">
                <span className="info-item-label">Delivery date: </span>
                <span className="info-item-value">{detailOrder?.DeliveryDate}</span>
              </div>
              <div className="order-info-item">
                <span className="info-item-label">Order status:</span>
                <span className="info-item-value status-shipped">{detailOrder?.status}</span>
              </div>
              <div className="order-info-item">
                <span className="info-item-label">Payment status:</span>
                <span className="info-item-value">{(!detailOrder?.pay) ? "Unpaid" : "Paid"}</span>
              </div>
            </div>
            <div className="order-items">
              {detailOrder?.products?.map((item: any) => (
                <div className="order-item">
                 <Link onClick={()=>scrollToTop()} to={`/product/${item.productId}`}><img src={item.productImage} alt="Product 1" className="product-image" /></Link> 
                  <div className="product-details">
                    <h3 className="product-name">{item.productTitle}</h3>
                    <p className="product-price">${item.price}</p>
                    <p className="product-quantity">Quantity: {item.quantity}</p>
                    <p className="product-total">Sum: ${item.quantity * item.price}</p>

                  </div>
                  <Button  onClick={() =>{
                     setIsModalOpen(true)
                     setProductId(item.productId)
                  }}>Đánh giá</Button>
                  <Modal open={isModalOpen} onOk={handleOk} onCancel={handleOk} >
                    <Rate tooltips={desc} onChange={setStar} value={star} />
                    {star ? <span className="ant-rate-text">{desc[star - 1]}</span> : ''}
                    <form  method="POST" onSubmit={handleSubmit}>
                      <label htmlFor="">Comment</label> <br />
                      <textarea name="content" onChange={e=>setContent(e.target.value)} id="" cols={70} rows={7}></textarea>
                      <button >Send</button>
                    </form>
                  </Modal>
                </div>
              ))}


            </div>
            <div className="order-summary">
              <h3 className="summary-title">Total payment:</h3>
              <p className="summary-amount">${detailOrder?.totalPayment}</p>
            </div>
            {(detailOrder?.status == "Cancelled" || !remainingTime) ? <Button disabled>Cancel</Button> :
              <div><Button onClick={() => handleCancel(detailOrder?._id)}>Cancel order</Button><p>{remainingTime}</p></div>
            }
          </div>
          : <div className='exist' >
            <img src="https://i.pinimg.com/564x/7c/f6/24/7cf6247aa5499759fded5f256ab65a53.jpg" alt="" />
            <h2 >Order does not exist</h2>
          </div>
        }
      </div>

    </div>
  )
}

export default OrderDetail