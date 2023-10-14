
import { Pagination, Select, Slider } from 'antd';
import { IProduct } from '../../../types/products';
import './products.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Products from '../../../components/products/Products';
import { filterPrice, getCategoryProducts, sortProduct } from '../../../service/products.service';
import { useProducts } from '../../../hooks/useProducts';
import { useCategories } from '../../../hooks/useCategories';


const ProductsPage = () => {
  const { products, totalPage, handlePageChange, dispatch: dispatchProducts } = useProducts()
  const { categories } = useCategories()
  const onChangePrice = (value: any) => {
    const min = value[0]
    const max = value[1]
    filterPrice(min, max).then(({ data }) => {
      dispatchProducts({
        type: 'GET_PRODUCTS',
        payload: data.filteredProducts
      })
    })
  }
  const handleCategoryProducts = (id: string) => {
    getCategoryProducts(id).then(({ data }) => {
      dispatchProducts({
        type: 'GET_PRODUCTS',
        payload: data.products.docs
      })
    })
  }
  

  const handleSortChange = (value: any) => {
    // console.log(value);
    sortProduct(value).then(({ data }) => {
      dispatchProducts({
        type: 'GET_PRODUCTS',
        payload: data.product.docs
      })
    })
  };
  
  return (
    <div>
      <ToastContainer></ToastContainer>
      <div className="product-main" >
        <main>
          <aside>
            <div className="item-aside">
              <h3>Categories</h3>
              <div className="cate">
                {categories?.map((item: any) => {
                  return (
                    <>
                      {(item.name !== "Default") && <button key={item._id} onClick={() => handleCategoryProducts(item._id)}> {item?.name}</button>}
                    </>
                  )
                })}
              </div>
            </div>
            <div className="item-aside">
              <h3>Filter price</h3>
              <Slider style={{ width: 200 }} range onChange={onChangePrice} defaultValue={[100, 1000]} max={1000} />
            </div>
           
          </aside>
          <article>
            <div className="banner-product">
              <div className="banner-text">
                <h3>celebrity perfumes</h3>
                <h3>For Man & Woman</h3>
                <button>SHOW NOW</button>
              </div>
            </div>
            <div id='tab' style={{ marginTop: "20px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
              </div>
              <Select
                defaultValue="Sort by name"
                onChange={(e) => handleSortChange(e)}
                options={[
                  { value: "asc", label: 'A - Z' },
                  { value: "desc", label: 'Z - A' },
                ]}
              />
            </div>
            <div>
              <div className="products" >
                {products?.map((item: IProduct) => {
                  return (
                    <Products product={item}></Products>
                  )
                })}
              </div>
              <div id='page'>
                <Pagination style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                  defaultCurrent={1} total={totalPage}
                  onChange={(e) => handlePageChange(e)
                  } />
              </div>
            </div>

          </article>

        </main>
      </div>
    </div>
  )
}

export default ProductsPage