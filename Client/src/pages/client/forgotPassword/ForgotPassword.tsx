import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { forgotPassword } from "../../../service/users.service"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ForgotPassword = () => {
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState("")
  const [errNewPassword, setErrNewPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errConfirmPassword, setErrConfirmPassword] = useState(false)
  const [comparePassword, setComparePassword] = useState(false)
  //async
  useEffect(() => {
    if (newPassword === confirmPassword) {
      setComparePassword(false);
    } else {
      setComparePassword(true);
    }
  }, [confirmPassword,newPassword]);

  const handleSubmit = (e: any) => {
    e.preventDefault()
    // hợp lệ tất cả các trường
    if (!newPassword) {
      setErrNewPassword(true)
    }
    if (!confirmPassword) {
      setErrConfirmPassword(true)
    }
    if (newPassword.length>=6 && confirmPassword && newPassword === confirmPassword) {
      // alert("oki")
      const data = { newPassword, confirmPassword }
      forgotPassword(data).then(({ data }) => {
        console.log(data)
        navigate("/auth/login")
      })
        .catch(({ response }) => alert(response.data.message))
    }
  }
  const handleChangeNewPassword = (e: any) => {
    const value = e.target.value
    setNewPassword(value.trim());
    handleBlurNewPassword(value.trim())
  }
  const handleBlurNewPassword = (value: any) => {
    if (value.length >= 6) {
      setErrNewPassword(false)
    } else {
      setErrNewPassword(true);
    }
  }
  const handleChangeConfirmPassword = (e: any) => {
    const value = e.target.value
    setConfirmPassword(value.trim());
    handleBlurConfirmPassword(value.trim())
  }
  const handleBlurConfirmPassword = (value: any) => {
    if (value.length > 0) {
      setErrConfirmPassword(false)
    } else {
      setErrConfirmPassword(true);
    }
  }
  return (
    <div className="mail-main">
      <form id="sendMail" onSubmit={handleSubmit}> <ToastContainer></ToastContainer>
      <p id="msg_token">Reset the password for your account</p>
        <div className="formItem" style={{marginLeft:"25px"}}>
          <label htmlFor="">Enter your new password: </label><br />
          <input type="password" id="password" onBlur={() => handleBlurNewPassword(newPassword)} onChange={e => handleChangeNewPassword(e)} />
          <p style={{ color: "red" }}>{errNewPassword ? "Password is required and must be at least 6 characters" : ""}</p>     
          <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword"
           onBlur={() => handleBlurConfirmPassword(confirmPassword)}
           onChange={e => handleChangeConfirmPassword(e)}
        />
          {!comparePassword ? <p style={{ color: "red" }}>{errConfirmPassword ? "Confirm Password is required" : ""}</p> : <p style={{ color: "red" }}>{comparePassword ? "ConfirmPassword don't match password" : ""}</p>}        
          <button>
            SAVE
          </button>
          <p> <Link to="/auth/login">CANCEL</Link></p>
        </div>
      </form>
      <div className="mail-img">
        <img src="https://keva-store-demo.myshopify.com/cdn/shop/files/instagram4.jpg?v=11928946692611708284" alt="" />
      </div>
    </div>
  )
}

export default ForgotPassword