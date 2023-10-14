import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {  register } from '../../../service/auth.service';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import {useEffect} from "react"
import { scrollToTop } from '../../../service/config.service';
import { ToastContainer, toast } from 'react-toastify';
export const Register = () => {
  const navigate = useNavigate()
  const userId = JSON.parse(localStorage.getItem('userId')!);
  useEffect(() => {
    if (userId) {
      navigate("/")
    }
  }, [])
  
  const onFinish = (values: any) => {
    console.log('Success:', values);
    register(values).then(() => {
      navigate("/auth/login")
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast: any) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Register account successfully'
      })
    })
      .catch(({ response }) => toast.error(response.data.message))
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const validatePhoneNumber = (_: any, value: any) => {
    const phoneRegex = /^0\d{9}$/; // Regex để kiểm tra số điện thoại bắt đầu bằng số 0 và có tổng 10 số
    if (value && !phoneRegex.test(value)) {
      return Promise.reject('Please enter a valid phone number!');
    }
    return Promise.resolve();
  };

  return (
    <div style={{ margin: " 100px" }}><ToastContainer></ToastContainer>
      <div className="menu-login">
        <Link to="/">Home/</Link>Register
      </div>
      <h3 style={{ textAlign: "center", marginTop: "30px" }}>Register</h3>
      <div className="login-btn">
        <img src="https://bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg" alt="" />
        <img src="https://bizweb.dktcdn.net/assets/admin/images/login/gp-btn.svg" alt="" />
      </div>
      <div id="formLogin">
        <Form
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="name"
            rules={[{ required: true, message: 'Please input your username!' }]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!', }, { type: 'email', message: 'Please enter a valid email address!' }]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please input your phone!' }, { validator: validatePhoneNumber }]}
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
          <Form.Item
            label="ConfirmPassword"
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
              }),
            ]}          >
            <Input.Password />
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }} >
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }} >
            <p>Do you already have an account?  <Link to="/auth/login" onClick={() => scrollToTop()}> Login here</Link></p>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
