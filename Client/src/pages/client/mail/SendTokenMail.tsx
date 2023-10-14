import { useState } from "react"
import { sendMailer } from "../../../service/users.service"
import { Link, useNavigate } from "react-router-dom"
import "./mail.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SendTokenMail = () => {
  const [email, setEmail] = useState("")
  const [errEmail, setErrEmail] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e: any) => {
    const value = e.target.value
    // console.log(value);
    setEmail(value.trim())
    handleBlur(value.trim())
  }
  const handleBlur = (value: string) => {
    if (value.length == 0) {
      setErrEmail(true)
    } else {
      const existEmail = /^[a-zA-Z0-9]+@gmail.com+$/
      const existEmail1 = /^[a-zA-Z0-9]+@fpt.edu.vn+$/
      const existEmail2 = /^[a-zA-Z0-9]+@hotmail.com+$/
      const existEmail3 = /^[a-zA-Z0-9]+@outlook.com+$/
      if (existEmail.test(value) || existEmail1.test(value) || existEmail2.test(value) || existEmail3.test(value)) {
        // setErrEmail("Email already exists")
        setErrEmail(false)
        return
      }
      setErrEmail(true)
    }
  }
  // console.log(email);
  const sendMail = (e: any) => {
    e.preventDefault();
    if (email && !errEmail) {
      setIsLoading(true)
      sendMailer(email).then(({ data }) => {
        
        console.log(data)
        navigate("/verifyTokenMail")
      })
        .catch(({ response }) =>{
           toast.error(response.data.message)
           setIsLoading(false)
        }
         
         )
    } else {
      setErrEmail(true)
    }
  }
  // console.log(isLoading);
  return (
    <div className="mail-main">
      <form id="sendMail" onSubmit={sendMail}> <ToastContainer></ToastContainer>
        {isLoading && <img src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700" alt="" />
        }
        <p id="msg_token">To receive the verification code, please enter the email you used for registration</p>
        <div className="formItem">
          <label htmlFor="">Enter your email: </label><br />
          <input type="email" name="email" id="" placeholder="Enter your email..." onBlur={() => handleBlur(email)} onChange={e => handleChange(e)} />
          <p style={{ color: "red" }}>{errEmail ? "Please enter a valid email! " : ""} </p>
          <button> SEND </button>
          <p> <Link to="/auth/login">CANCEL</Link></p>
        </div>
      </form>
      <div className="mail-img">
        <img src="https://anivershop-store-demo.myshopify.com/cdn/shop/files/banner72.jpg?v=1614764444" alt="" />
      </div>
    </div>
  )
}

export default SendTokenMail