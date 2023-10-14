import { Pagination, Tag } from "antd"

import { IProduct, IResSize } from "../../../types/products"
import { Link } from "react-router-dom"
import { useProducts } from "../../../hooks/useProducts"

const ListProducts = () => {
 const {products, totalPage, onHandleRemove, handlePageChange} = useProducts()
  return (
    <div style={{ padding: "  50px" }} >
      <table id="table-order" style={{ width: "1150px" }}>
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Brand</th>
            <th>Capacity</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: IProduct, index: number) => (
            <tr>
              <td>{index + 1}</td>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td><img src={product.image} alt="" /></td>
              <td>${product.sizes[0].price}</td>
              <td>{product.brandId.name}</td>
              <td>{product.sizes.map((item: IResSize) => (
                <p>{item.sizeId.name},</p>
              ))}</td>
              <td>{product.categoryId.name}</td>
              <td>
                <Link to={`../product/update/${product._id}`}> <Tag color="green">Edit</Tag></Link>
                <Tag color="red" onClick={() => onHandleRemove(product._id)}>Delete</Tag>
              </td>
            </tr>
          ))}

        </tbody>


      </table>
      <div id='page' style={{ marginTop: "30px" }}>
        <Pagination style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          defaultCurrent={1} total={totalPage}
          onChange={(e) => handlePageChange(e)
          } />
      </div>
    </div>
  )
}

export default ListProducts