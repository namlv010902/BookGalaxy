import Carousel from '../../../components/banner/banner'
import './home.css'

import { useEffect, useState } from "react"
import { getProductBest, getProductNew } from '../../../service/products.service'
import { IProduct } from '../../../types/products'
import Products from '../../../components/products/Products'
import { Loading } from '../../../components/loading/Loading'

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>()
  const [product, setProduct] = useState<IProduct[]>()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getProductNew().then(({ data }) => {
      setProducts(data.product.docs)
      setLoading(false)
    }
    ).catch(() => setLoading(true))
  }, [])
  useEffect(() => {
    getProductBest().then(({ data }) => setProduct(data.product.docs)
    )
  }, [])
  return (
    <div className='home'>
      <Carousel ></Carousel>
      <div className="home-main">
        <div className="feature-area">
          <div className="feature-item">
            <img src="https://ward-magazine.myshopify.com/cdn/shop/files/icon01_small_0c9d7e47-ca36-479a-8326-ccdd6a94c24b_small.webp?v=1685627563" alt="" />
           <div className="feature-text">
            <h4>Quick Delivery</h4>
            <p>Most product are free shipping</p>
           </div>
          </div>
          <div className="feature-item">
            <img src="https://ward-magazine.myshopify.com/cdn/shop/files/icon02_small_bc5d5cc7-6e66-4883-b23f-3eef8b39df89_small.webp?v=1685627589" alt="" />
           <div className="feature-text">
            <h4>Best Deal</h4>
            <p>Most product are free shipping</p>
           </div>
          </div>
          <div className="feature-item">
            <img src="https://ward-magazine.myshopify.com/cdn/shop/files/icon03_small_c52b4e3e-5f58-465e-8dee-6da37ec1ec1f_small.webp?v=1685627624" alt="" />
           <div className="feature-text">
            <h4>Quick Delivery</h4>
            <p>Most product are free shipping</p>
           </div>
          </div>
          <div className="feature-item">
            <img src="https://ward-magazine.myshopify.com/cdn/shop/files/icon04_small_b75d0a09-50ef-44d9-95fd-409360802310_small.webp?v=1685627658" alt="" />
           <div className="feature-text">
            <h4>Secured Payment</h4>
            <p>Most product are free shipping</p>
           </div>
          </div>

        </div>
        <div className="e-con-inner">
          <div className="inner-text">
            <h3>Experience Scent Like Never Before</h3>
            <p>Immerse yourself in the artistry of scent creation as we take you on a visual odyssey through the fascinating history, ingredients, and inspirations behind our exquisite collection of perfumes</p>
            <button>BUY NOW</button>
          </div>
          <div className="inner-image">
            <div className="img-Above">
            <img src="https://wordpress.templatetrip.com/WCMTM01/WCMTM012_booklet/wp-content/uploads/revslider/slider-1/slider-02.png" alt="" />
            </div>
            <div className="img-dioi">
            <img src="https://template83028.motopreview.com/mt-demo/83000/83028/mt-content/uploads/2019/06/mt-1842_products_img11.jpg" alt="" />
            </div>
          </div>
        </div>
        <div className="title" >
          <div className="title-child"><h1>BEST SELLER</h1> <br />
          <img src="https://wordpress.templatetrip.com/WCMTM01/WCMTM012_booklet/wp-content/uploads/2023/03/seperator.png" alt="" /></div>
        </div>
        {!loading ? <div className="products">
          {product?.map((item: IProduct) => (
            <Products product={item}  ></Products>
          ))}

        </div> : <Loading></Loading>}
        <div className="banner-child">
          <div className="trendy-text">
            <p>Get up to 20% off</p>
            <h3>SO MANY BOOKS SO LITTLE TIME</h3>
            <button className='btn-shop'>SHOW NOW</button>
          </div>
          <div className="trendy-image">
            <img className='trendy_item' src="https://template65582.motopreview.com/mt-demo/65500/65582/mt-content/uploads/2018/01/mt-1321_home_slider04.jpg" alt="" />
            <img className='trendy_item_block' src="https://wordpress.templatetrip.com/WCMTM01/WCMTM012_booklet/wp-content/uploads/2023/03/about2.png" alt="" />

          </div>
        </div>

        <div className="title" >
          <div className="title-child"><h1>TRENDING</h1> <br />
          <img src="https://wordpress.templatetrip.com/WCMTM01/WCMTM012_booklet/wp-content/uploads/2023/03/seperator.png" alt="" />

          </div>

        </div>
      {!loading ?<div className="products">
          {products?.map((item: IProduct) => (
            <Products product={item}  ></Products>
          ))}
        </div> : <Loading></Loading>}
        

      </div>
    </div>
  )
}

export default Home