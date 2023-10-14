import { useState } from "react"
import { verifyTokenMailer } from "../../../service/users.service"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyTokenMail = () => {
    const navigate = useNavigate()
    const [token, setToken] = useState("")
    const [isValidToken, setIsValidToken] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [verification, setVification] = useState("")
    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (token) {
            setIsLoading(true)
            verifyTokenMailer(token).then(({ data }) => {
                console.log(data)
                localStorage.setItem("emailToken", JSON.stringify(data.AccessToken));
                navigate("/forgotPassword")
            })
                .catch(({ response }) => setVification(response.data.message))
        } else {
            setIsValidToken(false)
        }
    }
    const handleChangeToken = (e: any) => {
        const value = e.target.value
        setToken(value.trim());
        handleBlurToken(value.trim());
    }
    const handleBlurToken = (value: any) => {
        if (value.length > 0) {
            setIsValidToken(true)
        } else {
            setIsValidToken(false);
            setVification("")
        }
    }
    return (
        <div className="mail-main">
            <form id="sendMail" onSubmit={handleSubmit}>
                <p id="msg_token"> Please check your email to receive the verification code.</p>
                <div className="formItem">
                    <label htmlFor="">Enter the verification code </label><br />
                    <input type="text" name="email" id="" placeholder="Enter the verification code..." onBlur={() => handleBlurToken(token)} onChange={e => handleChangeToken(e)} />
                    <p style={{ color: "red" }}>{!isValidToken ? "This is required! " : ""} {verification ? <p>{verification} </p> : ""}</p>
                    <button> SEND </button>
                    <p> <Link to="/sendTokenMail">CANCEL</Link></p>
                </div>
            </form>
            <ToastContainer></ToastContainer>
            <div className="mail-img">
                <img src="https://anivershop-store-demo.myshopify.com/cdn/shop/articles/blog3_1024x1024.jpg?v=1601720139" alt="" />
            </div>
        </div>
    )
}

export default VerifyTokenMail
