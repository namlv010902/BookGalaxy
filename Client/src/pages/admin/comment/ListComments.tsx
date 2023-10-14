
import { IComment } from "../../../types/comment"
import { useComments } from "../../../hooks/useComments"
import { Tag } from "antd"



const ListComments = () => {
  const { comments, onHandleRemove } = useComments()
  
  return (
    <div style={{ padding: "  50px" }} >
      <table id="table-order" style={{ width: "1150px" }}>
        <thead>
          <tr>
            <th></th>
            <th>Product Name</th>
            <th>User Name</th>
            <th>Content</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {comments?.map((item: IComment, index: number) => {
             const timeFormat = new Date(item.createdAt).toLocaleDateString()
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{item.productId.name}</td>
                <td>{item.userId.name}</td>
                <td>{item.content}</td>
                <td>{timeFormat}</td>
                <td>
                  <Tag color="orange-inverse" style={{cursor:"pointer"}} onClick={()=>onHandleRemove(item._id)}>Delete</Tag>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ListComments