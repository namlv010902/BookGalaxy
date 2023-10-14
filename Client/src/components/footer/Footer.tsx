import { Link } from 'react-router-dom'
import './footer.css'

const Footer = () => {
  return (
    <div className='footer'>
      <footer>
        <div className="footer-left">
          <h3>FOLLOW US</h3>
          <div className="footer-icon">
            <i className="fa fa-instagram" aria-hidden="true"></i>
            <i className="fa fa-twitter" aria-hidden="true"></i>
         <Link to="https://www.facebook.com/profile.php?id=100064288837955" >  <i className="fa fa-facebook" aria-hidden="true"></i></Link> 
          </div>
          <div className="footer-menu">
            <p>SITEMAP CONTACT US SUPPORT CENTER DELIVERY & RETURNS FAQS</p>
          </div>
        </div>
        <div className="footer-right">
          <h3>CONTACT US</h3>
          <p>If you'd like to get in touch, please send us a message or use the live chat function below during regular business hours.</p>
        <span>namle01092002@gmail.com</span>
        </div>
      </footer>
       <p className='copyright'>COPYRIGHTS © 2023 NAMLE. ALL RIGHTS RESERVED.</p>
      
    </div>
  )
}

export default Footer