
import { Select, Slider } from 'antd';
import { IProduct } from '../../../types/products';
import './products.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Products from '../../../components/products/Products';
import { filterPrice, getCategoryProducts, sortProduct } from '../../../service/products.service';
import { useProducts } from '../../../hooks/useProducts';
import { useCategories } from '../../../hooks/useCategories';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import "./paginate.css"
const ProductsPage = () => {
  const { products,  dispatch: dispatchProducts } = useProducts()
  const { categories } = useCategories()
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(8);
  const onChangePrice = (value: any) => {
    const min = value[0]
    const max = value[1]
    filterPrice(min, max).then(({ data }) => {
      dispatchProducts({
        type: 'GET_PRODUCTS',
        payload: data.product.docs
      })
    })
  }
  const handleCategoryProducts = (id: string) => {
    console.log(id);

    getCategoryProducts(id).then(({ data }) => {
      dispatchProducts({
        type: 'GET_PRODUCTS',
        payload: data.product.docs
      })
    })

  }
  const startIndex = currentPage * perPage;
  const endIndex = startIndex + perPage;
  const currentProducts = products.slice(startIndex, endIndex);
  const handlePageChange = (selectedPage:any) => {
    setCurrentPage(selectedPage.selected);
  };

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
            <div className="item-aside">

            </div>
            <div className="item-aside">

            </div>
            <div className="item-aside">

            </div>
          </aside>
          <article>
            <div className="banner-product">

            </div>
            <div id='tab' style={{ marginTop: "20px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
              </div>
              <Select
                defaultValue="Sort by price"
                onChange={(e) => handleSortChange(e)}
                options={[
                  { value: "asc", label: 'Low to high' },
                  { value: "desc", label: 'High to low' },
                ]}
              />
            </div>
            <div>
              <div className="products" >
                {currentProducts?.map((item: IProduct) => {
                  return (
                    <Products product={item}></Products>
                  )
                })}
              </div>
              <div >
                <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={Math.ceil(products.length / perPage)} // Tổng số trang
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageChange}
                  containerClassName={'pagination'}
                  activeClassName={'active'}
                />

              </div>
            </div>

          </article>

        </main>
      </div>
    </div>
  )
}

export default ProductsPage