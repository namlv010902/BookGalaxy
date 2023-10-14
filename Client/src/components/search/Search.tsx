import { useState } from 'react';
import { IProduct } from '../../types/products';
import { searchProduct } from '../../service/products.service';
import { Link } from 'react-router-dom';
import { Popover } from 'antd';
import { scrollToTop } from '../../service/config.service';
const Search = () => {
    const [products, setProducts] = useState<IProduct[]>()
    const handleSearch = (value: any) => {
        console.log(value);
        searchProduct(value).then(({ data }) => {
            setProducts(data.product.docs)
        })
    }
    const showSearch = (
        <div className='show-search'>
            {products?.map(item => {
                return (
                    <div key={item._id} >
                        <div className='productInCart'>
                        <Link onClick={() => scrollToTop()} className="item-cart" to={`/product/${item._id}`}>
                            <div className="image-cart">
                                <img src={item.image} alt="" />
                            </div>
                            <div className="product-in-search">
                                <p id='search-name'>{item.name}</p>
                                <strong id='price'>${item.sizes[0].price} </strong>
                            </div>
                        </Link>
                    </div>
                    </div>
                )
            })}
            {products?.length == 0 && <p>Not found</p>}
        </div>
    )
    return (
        <form action="#" id="formSearch" >
            <Popover title={showSearch}> <input onChange={e => handleSearch(e.target.value)} id="inputSearch" type="text" name="" placeholder="Search..." /></Popover>
            <button className='btn-search' disabled><i className="fa fa-search" aria-hidden="true"></i></button>
        </form>
    )
}

export default Search