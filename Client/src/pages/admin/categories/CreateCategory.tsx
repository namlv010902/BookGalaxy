import { useForm } from "react-hook-form"
import { createCategory } from "../../../service/categories.service"
import { useNavigate } from "react-router-dom"
type IForm = {
    name: string
}

const CreateCategory = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IForm>()
   const navigate = useNavigate()
    const onSubmit = (data: IForm) => {
        console.log(data);
        createCategory(data).then(({ data }) => {
            alert(data.message)
            navigate("/admin/categories")
        })
            .catch(({ response }) => {
                alert(response.data.message)
            })

    }
    return (
        <div style={{ padding: "50px" }}>
            <h3>CreateCategory</h3>
            <form onSubmit={handleSubmit(onSubmit)} id="formAddProduct" >
                <div>
                    <label htmlFor="productName">Category name:</label> <br />
                    <input
                        type="text"
                        id="input-groupAdd"
                        {...register('name', { required: true })}
                    />
                    <p id="err"> {errors.name && <span>This is required</span>}</p>
                </div>
                <button type="submit" id="btn-create">Create category</button>
            </form>
        </div>
    )
}

export default CreateCategory