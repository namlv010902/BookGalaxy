
import { useForm, useFieldArray } from 'react-hook-form';
import "./products.css"
import {  useStoreCategory } from '../../../store/hooks';
import { useEffect,useState } from 'react';
import { getCategories } from '../../../service/categories.service';
import { ICate } from '../../../types/categories';
import { getSizes } from '../../../service/size.service';
import { ISize } from '../../../types/size';
import { createProduct } from '../../../service/products.service';
import { getBrands } from '../../../service/brand.service';
import { IBrand } from '../../../types/brand';
import { useNavigate } from 'react-router-dom';
import { upLoadImg } from '../../../service/upload.service';
interface ProductFormData {
  name: string;
  image: string;
  description: string,
  brandId: string,
  gender: string,
  categoryId: string
  sizes: {
    sizeId: string;
    price: number;
    inStock: number;
  }[];
}

const CreateProduct = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
    defaultValues: {
      sizes: [{ sizeId: '', price: 0, inStock: 0 }],
    },
  });
  const navigate = useNavigate()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sizes',
  });
  const { categories, dispatch } = useStoreCategory()

  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    getCategories().then(({ data }) => {
      dispatch({
        type: "GET_CATEGORIES",
        payload: data.category
      })
    })
   
  }, [])
  const gender = ['Man', 'Woman', 'Unisex']
  const handleUpload = (value: React.ChangeEvent<HTMLInputElement>) => {
    if (value.target.files) {
      const file = value.target.files[0]
      const formData = new FormData();
      formData.append('image', file);
      upLoadImg(formData).then((res) => {
      setImgUrl(res.data.data[0].url);
      })
    }
  }
  const onSubmit = (data: ProductFormData) => {
    data.image = imgUrl
  //  console.log(data);
    createProduct(data).then(() => {
      alert(" Product created successfully")
      navigate("/admin/products")
    })
      .catch(({ response }) => {
        alert(response.data.message)
      })
    
  };


  return (
    <div style={{ padding: '50px' }}>
      <h3>Create Product</h3>
      <form onSubmit={handleSubmit(onSubmit)} id="formAddProduct" >
        <div>
          <label htmlFor="productName">Product name:</label> <br />
          <input
            type="text"
            id="input-groupAdd"
            {...register('name', { required: true })}
          />
          <p id="err"> {errors.name && <span>This is required</span>}</p>
        </div>
        <div>
          <label htmlFor="productName">Image:</label> <br />
          <input
            type="file"
            id="input-groupAdd"
            {...register('image', { required: true })}
            onChange={(e) => handleUpload(e)}
           
          />
          <p id='err'>{errors.image && <span>This is required</span>}</p>
        </div>
        <div>
          <label htmlFor="productName">Gender:</label> <br />
          <select
            id="input-groupAdd"
            {...register('gender', { required: true })}
          >
            <option value="" hidden>Choose gender</option>
            {gender.map((item: string) => (
              <option value={item}>{item}</option>
            ))}
          </select>
          <p id='err'>{errors.gender && <span>This is required</span>}</p>
        </div>
       
        <div>
          <label htmlFor="productName">Category:</label> <br />
          <select id="input-groupAdd"{...register("categoryId", { required: true })}>
            <option value="" hidden>Choose category</option>
            {categories.map((item: ICate) => (
              <option value={item._id}>{item.name}</option>
            ))}
          </select>
          <p id='err'>{errors.categoryId && <span>This is required</span>}</p>
        </div>
        <div>
          <label htmlFor="">Description</label> <br />
          <textarea id='input-groupAdd'{...register("description", { required: true })} ></textarea> <br />
          <p id='err'>{errors.description && <span>This is required</span>}</p>
        </div>

        <button type="submit" id="btn-create">Create product</button>
      </form>
    </div>
  );
};

export default CreateProduct;