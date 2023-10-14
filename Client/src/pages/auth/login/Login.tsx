import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import './login.css'
import { scrollToTop } from '../../../service/config.service';
import { login } from '../../../service/auth.service';
import { useStoreUser } from '../../../store/hooks';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
const Login = () => {
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('accessToken')!);
  useEffect(() => {
    if (accessToken) {
      navigate("/")
    }
  }, [accessToken])
  const { dispatchUser } = useStoreUser()
  const onFinish = (values: any) => {
    login(values).then(({ data }) => {
      localStorage.setItem("accessToken", JSON.stringify(data.accessToken))
      data.user.role == "admin" ? navigate("/admin") : navigate("/")
      dispatchUser({
        type: 'GET_PROFILE',
        payload: data.user
      })
    })
    .catch(({response})=>toast.error(response.data.message))
  };
  const handleGoogleLogin = () => {
    const clientId = 'Givenchy-396512';
    const redirectUri = 'http://localhost:1573/'; // Địa chỉ URL để Google chuyển hướng sau khi đăng nhập thành công
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile`;
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
  
    <div style={{ margin:" 100px" }}>   <ToastContainer></ToastContainer>
      <div className="menu-login">
        <Link to="/">Home/</Link>Login
      </div>
      <h3 style={{ textAlign: "center", marginTop: "30px" }}>Login</h3>
      <div className="login-btn">
        <img src="https://bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg" alt="" />
        <img onClick={()=>handleGoogleLogin()} src="https://bizweb.dktcdn.net/assets/admin/images/login/gp-btn.svg" alt="" />
      </div>
      <div id='formLogin'>
        <Form
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!',  },{type: 'email',message:'Please enter a valid email address!'}]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }, { min: 6, message: 'The password must be at least 6 characters long!' }]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <Link to="/sendTokenMail" onClick={() => scrollToTop()}>Forgot password?</Link>
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <p>Do not have an account?<Link to="/auth/register" onClick={() => scrollToTop()}> Register here</Link></p>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login