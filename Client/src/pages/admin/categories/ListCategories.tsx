import { Tag } from "antd"
import { Link } from "react-router-dom"
import { ICate } from "../../../types/categories"
import { useCategories } from "../../../hooks/useCategories"

const ListCategories = () => {
   const {categories, onHandleRemove} = useCategories()
    return (
        <div style={{ padding: "50px" }} >
            <table id="table-order" style={{ width: "1150px" }}>
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Product count</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((item: ICate, index: number) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item._id}</td>
                            <td>{item.name}</td>
                            <td>{item.productId.length}</td>
                            <td>
                                <Link to={`../category/update/${item._id}`}> <Tag color="green">Edit</Tag></Link>
                                {/* id danh mục mạc định ko xóa  */}
                                {item._id !== "64dd906dd350fc836c462667" && <Tag color="red" onClick={() => onHandleRemove(item._id)}>Delete</Tag>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default ListCategories