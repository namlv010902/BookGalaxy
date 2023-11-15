
import { Button, Form, Input, message,Rate } from 'antd';
import './comment.css'
import { createComment, getCommentProduct } from '../../service/comment.service';
import { useEffect } from "react"
import { useStoreComment } from '../../store/hooks';
import { IComment } from '../../types/comment';
interface IProps {
  data: any,
  idProduct: string,

}
const ShowComment = (props: IProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { comments, dispatch } = useStoreComment()
  useEffect(() => {
    const fetchComment = async () => {
      const { data } = await getCommentProduct(props.idProduct)
      dispatch({
        type: 'GET_COMMENTS',
        payload: data.comment
      })
    }
    fetchComment()
  }, [])
  const accessToken = JSON.parse(localStorage.getItem('accessToken')!)
  const onFinish = (values: any) => {
    props.data["content"] = values.content
    if(!accessToken){
      messageApi.open({
        type: 'error',
        content: 'Please log in!',
      });
      return
    }
    // console.log(props.data);
    createComment(props.data).then(() => {
      getCommentProduct(props.idProduct).then(({ data }) => {
        dispatch({
          type: 'GET_COMMENTS',
          payload: data.comment
        })
      })
    }
    )
    .catch((err)=>alert(err))
  }
  return (
    <div>
      <div className="show-comment"> {contextHolder}
        {comments?.map((item: IComment) => {
          var outTime = new Date(item.createdAt).toLocaleDateString();
          return (
            <div className='item-showComment' key={item._id}>
              <img src={item?.userId?.avatar} alt="Avatar" />
              <div className="comment-info">
                <h3 className="comment-name">{item?.userId?.name}</h3>
                <p className="comment-date">{outTime}</p>
                <Rate defaultValue={item.star} disabled></Rate>
               
                <p className="comment-content">{item?.content}</p>
              </div>
            </div>
          )
        })}

      </div>


  

    </div>
  )
}

export default ShowComment
