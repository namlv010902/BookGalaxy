import { deleteComment, getComments } from "../service/comment.service"
import { useStoreComment } from "../store/hooks"
import { useEffect } from "react"
export const useComments = () => {
    const { comments, dispatch } = useStoreComment()
    useEffect(() => {
        getComments().then(({ data }) => {
            dispatch({
                type: "GET_COMMENTS",
                payload: data.comment
            })
        })
    }, [])
    const onHandleRemove = (id: string) => {
      if(window.confirm("Are you sure you want to remove")){
        deleteComment(id).then(() => {
            getComments().then(({ data }) => {
                dispatch({
                    type: "GET_COMMENTS",
                    payload: data.comment
                })
            })
            
        }).catch(({response})=>alert(response.data.message))
      }
    }
    return { comments, onHandleRemove }
}