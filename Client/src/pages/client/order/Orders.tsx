
import { IOrder } from '../../../types/order';
import "./Order.css"
import { useEffect } from "react"
import { Button, Tag } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useStoreOrder } from '../../../store/hooks';
import { filterOrder, getUserOrder } from '../../../service/order.service';

const InvoiceList = () => {
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('accessToken')!);
  useEffect(() => {
    if (!accessToken) {
      navigate("/auth/login")
    }
  }, [])
  const { orders, dispatch } = useStoreOrder()
  useEffect(() => {
    getUserOrder().then(({ data }) => {
      dispatch({
        type: 'USER_GET_ORDERS',
        payload: data.order
      })
    })
  }, [])
  const onHandleFilterOrder = (status: string) => {
    filterOrder(status).then(({ data }) => {
      dispatch({
        type: 'USER_GET_ORDERS',
        payload: data.order
      })
    })
  }
  return (
    <div>
      <div className="order-main">
        <h1 >Invoice</h1>
        {orders ? <div>
          <Button onClick={() => onHandleFilterOrder("")}>All</Button>
          <Button onClick={() => onHandleFilterOrder("Pending")}>Pending</Button>
          <Button onClick={() => onHandleFilterOrder("Processing")}>Processing</Button>
          <Button onClick={() => onHandleFilterOrder("In transit")}>In transit</Button>
          <Button onClick={() => onHandleFilterOrder("Received")}>Received</Button>
          <Button onClick={() => onHandleFilterOrder("Cancelled")}>Cancelled</Button>

          <table id="table-order">
            <thead>
              <tr >
                <th >Invoice ID</th>
                <th >Order date</th>
                <th>Status</th>
                <th>Total price</th>
                <th>Payment status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((invoice: IOrder) => {
                const timeExist = new Date(invoice.createdAt).toLocaleString();
                return (
                  <tr key={invoice._id}>
                    <td>{invoice._id}</td>
                    <td>{timeExist}</td>
                    <td>{invoice.status}</td>
                    <td>${invoice.totalPrice}</td>
                    <td>{(invoice.pay == true) ? "Paid" : "Unpaid"}</td>
                    <td><Link to={`/order/${invoice._id}`}><Tag color="blue"> <i style={{ fontSize: "18px", margin: "5px" }} className="fa-solid fa-eye"></i></Tag></Link></td>
                  </tr>
                )
              }

              )}
            </tbody>
          </table>
        </div>
          : <h3>You haven't placed any orders yet.</h3>}
      </div>
    </div>
  );
};

export default InvoiceList;
