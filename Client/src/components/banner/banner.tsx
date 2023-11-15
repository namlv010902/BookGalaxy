
import Slider from 'react-slick';
import styles from './banner.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const images = [
  'https://template65582.motopreview.com/mt-demo/65500/65582/mt-content/uploads/2018/01/mt-1321_home_slider-3.jpg',
  'https://template65582.motopreview.com/mt-demo/65500/65582/mt-content/uploads/2018/01/mt-1321_home_slider-2.jpg',
  'https://template65582.motopreview.com/mt-demo/65500/65582/mt-content/uploads/2018/01/mt-1321_home_slider-1.jpg',

];
const showInnerText = ["THE HOBBIT AND THE LORD OF THE RINGS", "DIVERGENT SERIES COMPLETE BOX SET",
  "THE DARK TOWER BY  STEPHEN KING "
]


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
    <div className={styles.banner}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <div className={styles.imageContainer}>
              <div className={styles.bannerImage}>
                <img src={image} alt={`Image ${index + 1}`} />
                <div className={styles.bannerText}>
                  <h1>{showInnerText[index]}</h1>
                  <p>This four volume, deluxe paperback boxed set contains J.R.R. Tolkien's epic masterworks THE HOBBIT and the three volumes of THE LORD OF THE RINGS.</p>
                </div>
              </div>

            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;