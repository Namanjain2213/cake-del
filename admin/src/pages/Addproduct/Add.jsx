import React, {  useState } from 'react'
import './Add.css'
import {assets} from '../../assets/assets_admin'
import axios from "axios";
import { toast } from 'react-toastify';
function Add({url}) {

  
  const [image,setimage] = useState(false);
  const [data,setdata] = useState({
    name: '',
    description: '',
    price: '',
    category:"Black-forest"
    });

    const onchangehandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setdata(data=>({
        ...data,[name]:value
      }))
    }

    const onsubmithandler = async (event) =>{
      event.preventDefault();
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('price', Number(data.price));
      formData.append('category', data.category);
      formData.append('image', image);

      const response = await axios.post(`${url}/api/food/add`,formData);
      if(response.data.success){
        setdata({
          name: '',
          description: '',
          price: '',
          category:"Black-forest"
        })
        setimage(false)
        toast.success("Cake added successfully");
      }
      else{
         toast.error("something went wrong");
      }
    }
    
  return (
    <div className='add'>
      <form  className='flex-cold' onSubmit={onsubmithandler}  >
        <div className="add-img-upload flex-cold">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" required />
          </label>
          <input type="file" onChange={(e)=>setimage(e.target.files[0])} id='image' hidden required />
        </div>
        <div className="add-product-name flex-cold ">
          <p>Product Name</p>
          <input onChange={onchangehandler} value={data.name} type="text" name = 'name' placeholder='Type here' required />
        </div>
        <div className="add-product-desc flex-cold">
          <p>Product description</p>
          <textarea onChange={onchangehandler} value={data.description} name="description" rows="6" placeholder='Type here' required ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-cold ">
             <p>Product category</p>
             <select name="category" onChange={onchangehandler} value={data.category} >
              <option value="Black-forest">Black-forest</option>
              <option value="Strawberry">Strawberry</option>
              <option value="Vanilla">Vanilla</option>
              <option value="Butterscotch">Butterscotch</option>
              <option value="Special">Special</option>
             </select>
          </div>
          <div className="add-price flex-cold ">
            <p>Product price</p>
            <input onChange={onchangehandler} value={data.price} type="number" name="price"  placeholder='₹20' required/>
          </div>
        </div>
        <button type='submit' className='add-btn' >Add</button>
      </form>
    </div>
  )
}

export default Add