import { useForm } from "react-hook-form"
import { getCategory, updateCategory } from "../../../service/categories.service"
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { ICate } from "../../../types/categories"
type IForm = {
    name: string
}

const UpdateCategory = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IForm>()
    const navigate = useNavigate()
    const { id } = useParams()
    const [category, setCategory] = useState<ICate>()
    useEffect(() => {
        if (id) {
            getCategory(id).then(({ data }) => setCategory(data.category))
        }
    }, [id])
    console.log(category);
    
    const onSubmit = (data: IForm) => {
        console.log(data);
        if (id) {
            updateCategory(id, data).then(({ data }) => {
                alert(data.message)
                navigate("/admin/categories")
            })
                .catch(({ response }) => {
                    alert(response.data.message)
                })
        }

    }
    return (
        <div style={{ padding: "50px" }}>
            <h3>Update Category</h3>
            {category &&
                <form onSubmit={handleSubmit(onSubmit)} id="formAddProduct" >
                    <div>
                        <label htmlFor="productName">Category name:</label> <br />
                        <input defaultValue={category?.name}
                            type="text"
                            id="input-groupAdd"
                            {...register('name', { required: true })}
                        />
                        <p id="err"> {errors.name && <span>This is required</span>}</p>
                    </div>
                    <button type="submit" id="btn-create">Update category</button>
                </form>
            }
        </div>
    )
}

export default UpdateCategory