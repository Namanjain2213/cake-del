import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios";
import {toast} from "react-toastify"
function List({url}) {
   
   const [list ,setlist] = useState([]);
   
   const fetchlist = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if(response.data.success){
     setlist(response.data.data);
    }
    else{
      toast.error("Error")
    }
   }

   const removecake = async(foodid)=>{
      const response = await axios.post(`${url}/api/food/remove`,{id:foodid});
      await fetchlist();
      if(response.data.success){
        toast.success(response.data.message);
      }
      else{
        toast.error(response.data.message);
      }
   }

   useEffect(()=>{
     fetchlist();
   },[])
  return (
    <div className='list add flex-cold'>
      <p>All Cake List</p>
      <div className="list-table">
        <div className="list-table-format title ">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
         list.map((item,index)=>{
          return(
            <div key={index} className="list-table-format">
              <img src={`${url}/images/`+item.image} alt="cake" className=""/>
              <p className="">{item.name}</p>
              <p className="">{item.category}</p>
              <p className="">{item.price}</p>
              <p onClick={()=>removecake(item._id)} className="delete">X</p>
            </div>
          )
         }) 
        }
      </div>

    </div>
  )
}

export default List