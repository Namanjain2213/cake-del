import React, { useContext } from 'react'
import './FoodDisplay.css'
import { Storecontext } from '../../Context/Storecontext'
import FoodItem from '../Fooditem/FoodItem'

function FoodDisplay({category}) {
   const {food_list} = useContext(Storecontext)
    return (
    <div className='food-display' id='food-display'>
        <h2>Top Cake Near You</h2>
        <div className="food-display-list">
            {food_list.map((item,index)=>{
             if(category==="All" || category===item.category){
              return <FoodItem key={index} id={item._id} name={item.name} description={item.description} image={item.image} price={item.price}/>
             }             
            })}
            </div> 
      
    </div>
  )
}

export default FoodDisplay