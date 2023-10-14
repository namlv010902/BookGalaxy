import { Button } from "antd"
import { Link } from "react-router-dom"
import './succesMessage.css'
const SuccessMessage = () => {
  return (
    <div>
      <div className="message-main">
      <img width={60} src="https://cdn-icons-png.flaticon.com/512/7518/7518748.png" alt="" />
        <h1 >Order Placed Successfully!!</h1>
        <p>Thank you for your purchase. Your order has been successfully placed.</p>
        <p>An email confirmation with the details of your order will be sent to you shortly.</p>
        <Button ><Link to="/order" >Check order</Link></Button>
      </div>
    </div>
  )
}

export default SuccessMessage