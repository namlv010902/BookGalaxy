import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ADUpdateOrder, orderDetail } from "../../../service/order.service"
import { IOrder } from "../../../types/order"
import { useForm } from "react-hook-form"

const UpdateOrder = () => {
  const { handleSubmit, register} = useForm<IOrder>()
  const { id } = useParams()
  const navigate = useNavigate()
  const [detailOrder, setDetailOrder] = useState<IOrder>()
  useEffect(() => {
    if (id) {
      orderDetail(id).then(({ data }) => {
        setDetailOrder(data.order)
      })
    }
  }, [])
  var outTime = new Date(detailOrder?.createdAt).toLocaleString();
  const statusOrder = ['Pending', 'Processing', 'In transit', 'Received', 'Cancelled']
  const onSubmit = (data: IOrder) => {
    console.log(data);
    if (id) {
      ADUpdateOrder(id, data).then(({ data }) => {
        alert(data.message)
        navigate("/admin/orders")
      })
        .catch(({ response }) => alert(response.data.message))
    }
  }
  return (
    <div style={{ marginTop: "-50px" }}>

      <div className="order-main" >
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="order-info-item">
                  <span className="info-item-label">Delivery date: </span>
                  <span className="info-item-value">{detailOrder?.DeliveryDate}</span>
                  <input type="date" {...register("DeliveryDate")} />
                </div>
                <div className="order-info-item">
                  <span className="info-item-label">Order status:</span>
                  <span className="info-item-value status-shipped">{detailOrder?.status}</span>
                  <select id="" {...register("status")} >
                    <option hidden value={detailOrder?.status}>{detailOrder?.status}</option>
                    {statusOrder.map((item: string) => (
                      <option value={item}>{item}</option>
                    ))}
                  </select>
                </div>
                <div className="order-info-item">
                  <span className="info-item-label">Payment status:</span>
                  <span className="info-item-value">{(!detailOrder?.pay) ? "Unpaid" : "Paid"}</span>
                  <select id="" {...register("pay")} >
                    <option value={false.toString()}>Unpaid</option>
                    <option value={true.toString()}>Paid</option>
                  </select>
                </div>
                <button className="addItemSize">Update</button>
              </form>
            </div>
            <div className="order-items">
              {detailOrder?.products?.map((item: any) => (
                <div className="order-item">
                  <img src={item.productId.image} alt="Product 1" className="product-image" />
                  <div className="product-details">
                    <h3 className="product-name">{item.productId.name}( {item.sizeId.name} )</h3>
                    <p className="product-price">${item.price}</p>
                    <p className="product-quantity">Quantity: {item.quantity}</p>
                    <p className="product-total">Sum: ${item.quantity * item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="order-summary">
              <h3 className="summary-title">Total payment:</h3>
              <p className="summary-amount">${detailOrder?.totalPrice}</p>
            </div>
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
export default UpdateOrder