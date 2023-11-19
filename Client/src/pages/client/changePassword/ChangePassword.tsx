
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useForm } from "react-hook-form"
import { useEffect } from 'react'
import { changePassword } from '../../../service/users.service'
import { message } from 'antd'
const ChangePassword = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem("accessToken")!)
  useEffect(() => {
    if (!accessToken) {
      navigate("/")
    }
  }, [accessToken])
  const { register, watch, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = (data: any) => {
    console.log(data);
    changePassword(data).then(({ data }) => {
      messageApi.open({
        type: 'success',
        content: data.message,
      });
      navigate("/profile")
    })
      .catch(({ response }) => {
        console.log(response.data.message);

        messageApi.open({
          type: 'error',
          content: response.data.message,
        });
      })

  }
  return (
    <div>
      <div className="mail-main"> {contextHolder}
        <h2 style={{ position: "absolute", left: "100px", top: "100px" }}>Change password</h2>
        <form id="sendMail" onSubmit={handleSubmit(onSubmit)}> <ToastContainer></ToastContainer>
          <div className="formItem" style={{ marginLeft: "25px" }}>
            <label htmlFor="">Enter your old password: </label>
            <input type="password" id="password" {...register("oldPassword", { required: true, minLength: 6 })} />
            <p style={{ color: "#f12" }}>{errors.oldPassword?.type == "required" ? "Please enter your old password" : ""} </p>
            <p style={{ color: "#f12" }}>{errors.oldPassword?.type == "minLength" ? "Password at least 6 characters" : ""} </p>
            <label htmlFor="">Enter your new password: </label>
            <input type="password" id="password" {...register("newPassword", { required: true, minLength: 6 })} />
            <p style={{ color: "#f12" }}>{errors.newPassword?.type == "required" ? "Please enter your new password" : ""} </p>
            <p style={{ color: "#f12" }}>{errors.newPassword?.type == "minLength" ? "Password at least 6 characters" : ""} </p>

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: true,
                validate: {
                  matchesPassword: value => value === watch("newPassword") || "Passwords do not match"
                }
              })}
            />
            <p style={{ color: "#f12" }}>
              {errors.confirmPassword?.type === "required" && "Please enter your new password"}
            </p>
            <p style={{ color: "#f12" }}>
              {errors.confirmPassword?.type === "matchesPassword" && "Passwords do not match"}
            </p>
            <button>
              SAVE
            </button>
            <p> <Link to="/profile">CANCEL</Link></p>
          </div>
        </form>
        <div className="mail-img">
          <img src="https://www.smartworld.it/wp-content/uploads/2021/09/password-privacy-sicurezza.jpg" alt="" />
        </div>
      </div>
    </div>
  )
}

export default ChangePassword