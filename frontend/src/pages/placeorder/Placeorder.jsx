import React, { useContext, useEffect, useState } from 'react'
import './Placeorder.css'
import { Storecontext } from '../../Context/Storecontext';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import {toast} from "react-toastify"
function Placeorder({setshowlogin}) {
  const { cartitem, food_list, removetocart, gettotalcartamount, token, url } = useContext(Storecontext);

  const [data, setdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })
  const onchangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartitem[item._id] > 0) {
        orderItems.push({ ...item, quantity: cartitem[item._id] });
      }
    });
  
    let orderData = {
      address: data,
      items: orderItems,
      amount: gettotalcartamount() + 30,
    };
  
    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });
  
      if (response.data && response.data.success) {
        const { session_url } = response.data;
        if (session_url) {
          window.location.replace(session_url); 
        } else {
          alert("Session URL is missing in the response.");
        }
      } else {
        alert(response.data?.message || "Order placement failed.");
      }
    } catch (error) {
      alert("An error occurred while placing the order.");
    }
  };
  
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      toast("Login first");
      navigate('/cart');
      setshowlogin(true);
    } else if (gettotalcartamount() === 0) {
      toast("Add item to cart");
      navigate('/cart');
    }
  }, [token, gettotalcartamount, navigate, setshowlogin]);
  
  


  return (

    <form onSubmit={placeOrder} className='place-order' >
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onchangehandler} value={data.firstName} type="text" placeholder='first-name' />
          <input required name='lastName' onChange={onchangehandler} value={data.lastName} type="text" placeholder='last-name' />
        </div>
        <input required name='email' onChange={onchangehandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onchangehandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onchangehandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onchangehandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onchangehandler} value={data.zipcode} type="text" placeholder='Zip-code' />
          <input required name='country' onChange={onchangehandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onchangehandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
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
              <p>₹{gettotalcartamount() === 0 ? 0 : 30}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{gettotalcartamount() === 0 ? 0 : gettotalcartamount() + 30}</b>
            </div>
          </div>
          <button type='submit'  >PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default Placeorder;