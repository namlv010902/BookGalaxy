import React,{useEffect} from 'react'
import { useStoreOrder } from '../../../store/hooks'
import { ADgetOrders } from '../../../service/order.service'
import { IOrder } from '../../../types/order'
import { Tag } from 'antd'
import { Link } from 'react-router-dom'

const ListOrders = () => {
  const{orders, dispatch} = useStoreOrder()
  useEffect(()=>{
  ADgetOrders().then(({data})=>{
    dispatch({
      type:'GET_ORDERS',
      payload:data.order
    })
  })
  },[])
  console.log(orders);
  
  return (
    <div style={{ padding: "  50px" }} >
    <table id="table-order" style={{ width: "1150px" }}>
        <thead>
            <tr>
                <th></th>
                <th>ID</th>
                <th>Status order</th>
                <th>Payment status</th>
                <th>Order date</th>
                <th>Total payment</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {orders?.map((item: IOrder, index: number) =>{
              const date = new Date(item.createdAt).toLocaleDateString()
              return (
                <tr>
                   <td>{index+1}</td>
                   <td>{item._id}</td>
                   <td>{item.status}</td>
                   <td>{item.pay ? "Paid" :"Unpaid"}</td>
                   <td>{date}</td>
                   <td>${item.totalPrice}</td>
                   <td><Link to={`../order/update/${item._id}`}><Tag color="cyan-inverse" ><i className="fas fa-edit"></i></Tag></Link></td>
                </tr>
            )
            })}
        </tbody>
    </table>
</div>
  )
}

export default ListOrders