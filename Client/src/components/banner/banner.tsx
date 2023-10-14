
import Slider from 'react-slick';
import './banner.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const images = [
  'https://bookcart.themability.com/image/cache/catalog/banners/mainbanner1-1920x800.png',
  'https://bookcart.themability.com/image/cache/catalog/banners/mainbanner2-1920x800.png',

];



const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return (
    <div className='banner'>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <div className='image-container'>
              <div className="banner-img">
              <img src={image} alt={`Image ${index + 1}`} />

              </div>
          
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;