import React, { useContext } from 'react'
import './Cart.css'
import { Storecontext } from '../../Context/Storecontext'
import {useNavigate} from "react-router-dom"
function Cart() {
  const { cartitem, food_list, removetocart , gettotalcartamount,url } = useContext(Storecontext);
  const navigate = useNavigate()
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartitem[item._id] > 0) {
            return (
              <>
                <div className=' cart-items-title cart-items-item  ' key={item._id}>
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartitem[item._id]}</p>
                  <p>{(cartitem[item._id] * item.price).toFixed(2)}</p>
                  <button onClick={() => removetocart(item._id)}>X</button>
                </div>
                <hr />
              </>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{gettotalcartamount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{gettotalcartamount()===0?0:30}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{gettotalcartamount()===0?0:gettotalcartamount()+30}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')} >PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
             <p>If you have a promo code, Enter it here</p>
             <div className='cart-promocode-input' >
              <input type="text" placeholder='Promo code'  />
              <button>Enter</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
