import Header from '../components/header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer'
import { scrollToTop } from '../service/config.service'
import { useState, useEffect } from 'react'

const Layout = () => {
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsScrollingUp(prevScrollPos < currentScrollPos);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='container-f'>
      <Header></Header>
      <Outlet></Outlet>
      {isScrollingUp && (
        <img
          id="Scroll"
          onClick={scrollToTop}
          src="https://uploads.commoninja.com/searchengine/wordpress/ultimate-scroll-to-top-button.png"
          alt=""
        />
      )}
      <Footer></Footer>
    </div>
  );
};

export default Layout;