import React, { useContext } from 'react';
import './Fooditem.css';
import { assets } from '../../assets/assets';
import { Storecontext } from '../../Context/Storecontext';

function FoodItem({ id, name, price, image, description }) {
    const { cartitem = {}, addtocart, removetocart, url } = useContext(Storecontext); 
    return (
        <div className='food-item'>
            <div className="fooditemimage">
                <img src={url ? `${url}/images/${image}` : ''} alt={name} className='food-item-image' />
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="Rating stars" />
                </div>
                <p className="food-item-desc">
                    {description}
                </p>
                <div className='food-item-price'>
                    <p>Note: Per pound</p>
                    <p className='main-price'>₹{price}</p>
                </div>
            </div>
            <hr />
            <div className='bton'>
                {
                    !cartitem[id]
                        ? <div className='add' onClick={() => addtocart(id)}> Add item</div>
                        : <div className='food-item-counter'>
                            <img onClick={() => removetocart(id)} src={assets.remove_icon_red} alt="Remove item" />
                            <p>{cartitem[id]}</p>
                            <img onClick={() => addtocart(id)} src={assets.add_icon_green} alt="Add item" />
                        </div>
                }
            </div>
        </div>
    );
}

export default FoodItem;
