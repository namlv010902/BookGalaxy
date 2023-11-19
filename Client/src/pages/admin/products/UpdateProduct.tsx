
import { useForm, useFieldArray } from 'react-hook-form';
import "./products.css"
import {  useStoreCategory } from '../../../store/hooks';
import { useEffect, useState } from 'react';
import { getCategories } from '../../../service/categories.service';
import { ICate } from '../../../types/categories';
import { getSizes } from '../../../service/size.service';
import { ISize } from '../../../types/size';
import { getProduct, updateProduct } from '../../../service/products.service';
import { getBrands } from '../../../service/brand.service';
import { IBrand } from '../../../types/brand';
import { useNavigate, useParams } from 'react-router-dom';
import { IProduct } from '../../../types/products';
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

const UpdateProduct = () => {
  const { categories, dispatch } = useStoreCategory()
 
  const [product, setProduct] = useState<IProduct>()
  const navigate = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    if (id) {
      getProduct(id).then(({ data }) => setProduct(data.product))
    }
    getCategories().then(({ data }) => {
      dispatch({
        type: "GET_CATEGORIES",
        payload: data.category
      })
    })
   
  }, [])

  const { register, control, handleSubmit, formState: { errors }, setValue } = useForm<ProductFormData>({
    defaultValues: {
      sizes: product?.sizes || [{ sizeId: '', price: 0, inStock: 0 }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sizes',
  });

  useEffect(() => {
    if (product?.sizes) {
      setValue('sizes', product?.sizes);
    }
  }, [product, setValue]);

  console.log(product);
  console.log(fields);

  const gender = ['Man', 'Woman', 'Unisex']
  const onSubmit = (data: ProductFormData) => {
    console.log(data);
    if (id) {
      updateProduct(id, data).then(() => {
        alert(" Product updated successfully")
        navigate("/admin/products")
      })
        .catch(({ response }) => {
          alert(response.data.message)
        })
    }
    // Gửi dữ liệu đi hoặc xử lý dữ liệu tại đây
  };


  return (
    <div style={{ padding: '50px' }}>
      <h3>UpdateProduct</h3>
      <img height={70} src={product?.image} alt="" />
      {product &&
        <form onSubmit={handleSubmit(onSubmit)} id="formAddProduct" >
          <div>
            <label htmlFor="productName">Product name:</label> <br />
            <input defaultValue={product?.title}
              type="text"
              id="input-groupAdd"
              {...register('name', { required: true })}
            />
            <p id="err"> {errors.name && <span>This is required</span>}</p>
          </div>
          <div>
            <label htmlFor="productName">Image:</label> <br />
            <input defaultValue={product?.image}
              type="text"
              id="input-groupAdd"
              {...register('image', { required: true })}
            />
            <p id='err'>{errors.image && <span>This is required</span>}</p>
          </div>

          <div>
            <label htmlFor="productName">Gender:</label> <br />
            <select
              id="input-groupAdd"
              {...register('gender', { required: true })}
            >
              <option value={product?.gender} hidden>{product?.gender}</option>
              {gender.map((item: string) => (
                <option value={item}>{item}</option>
              ))}
            </select>
            <p id='err'>{errors.gender && <span>This is required</span>}</p>
          </div>
          
          <div>
            <label htmlFor="productName">Category:</label> <br />
            <select id="input-groupAdd"{...register("categoryId", { required: true })}>
              <option value={product?.categoryId?._id} hidden>{product?.categoryId?.name}</option>
              {categories.map((item: ICate) => (
                <option value={item._id}>{item.name}</option>
              ))}
            </select>
            <p id='err'>{errors.categoryId && <span>This is required</span>}</p>
          </div>
          <div>
            <label htmlFor="">Description</label> <br />
            <textarea defaultValue={product?.description} id='input-groupAdd'{...register("description", { required: true })} ></textarea> <br />
            <p id='err'>{errors.description && <span>This is required</span>}</p>
          </div>

          <button type="submit" id="btn-create">Update product</button>
        </form>
      }
    </div>
  );
};

export default UpdateProduct;