import { Link, useNavigate } from "react-router-dom"
import Search from "../search/Search"
import { scrollToTop } from "react-scroll/modules/mixins/animate-scroll"
import { useEffect, useRef } from "react"
import { useStoreUser } from "../../store/hooks"
import { getProfile } from "../../service/auth.service"
import { Popover } from "antd"
import { useAuth } from "../../hooks/useLogout"
const HeaderAD = () => {
  const isFirstRender = useRef(true);
  const { user, dispatchUser } = useStoreUser()
  const {handleLogout} = useAuth()
  const navigate = useNavigate()
  const token = JSON.parse(localStorage.getItem('accessToken')!)
  useEffect(() => {
    if (!token) {
      navigate("/auth/login")
    }
    getProfile().then(({ data }) => {
      dispatchUser({
        type: 'GET_PROFILE',
        payload: data.user
      })
      if (isFirstRender.current) {
        isFirstRender.current = false;
      } else if (user.role == "member") {
        navigate("/")
      }
    })

  }, [token])
  // console.log(user.role);
 
  const content = (
    <div>
      <p style={{ cursor: "pointer" }} onClick={() => handleLogout()}>Log out</p>
    </div>
  )

  return (
    <div className='header' style={{ boxShadow: "0px 5px 21px -5px #CDD1E1" }}>
      <header>
        <div className='logo'>
          <Link onClick={() => scrollToTop()} to="/admin"> <img height="60px" src="https://charmee-store-demo.myshopify.com/cdn/shop/files/logo.png?v=1613708277" alt="" /></Link>
        </div>
        <Search></Search>

        <div id="avatar" style={{ display: "flex" }}>
          <div className="action" style={{ marginLeft: "-150px" }}>
            <i className="fa fa-bell" aria-hidden="true"></i>
            <i className="fa-solid fa-envelope"></i>
          </div>
          <Popover placement='bottom' content={content} >
            <img id="avatar" style={{ width: "100%" }} src={user.avatar} alt="" /></Popover>
        </div>
      </header>
    </div>
  )
}

export default HeaderAD