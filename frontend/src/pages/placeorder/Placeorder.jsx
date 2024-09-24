import React, { useContext, useEffect, useState } from 'react';
import './Placeorder.css';
import { Storecontext } from '../../Context/Storecontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function Placeorder({ setshowlogin }) {
  const { cartitem, food_list, gettotalcartamount, token, url } = useContext(Storecontext);

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
  });

  const onchangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata(data => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    
    const razorpayKeyId = "rzp_test_ZQBHVCR5TVhO1n";

    if (!razorpayKeyId) {
      console.error('Razorpay key ID is not defined. Please check your .env file.');
      return;
    }

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
        const { razorpay_order_id, orderId } = response.data;

        // Initialize Razorpay
        const options = {
          key: razorpayKeyId,
          amount: orderData.amount * 100,
          currency: "INR",
          name: "Your Shop Name",
          description: "Order Description",
          order_id: razorpay_order_id,
          handler: async function (response) {
            const paymentResponse = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: orderId,
            };

            const verifyResponse = await axios.post(`${url}/api/order/verify`, paymentResponse);
            if (verifyResponse.data.success) {
              toast.success("Payment verified successfully!");
              // Navigate to orders page
              navigate('/myorders'); // Uncomment after verifying payment
            } else {
              toast.error("Payment verification failed!");
              navigate('/');
            }
          },
          prefill: {
            name: data.firstName + " " + data.lastName,
            email: data.email,
            contact: data.phone,
          },
          theme: {
            color: "#F37254",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
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
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onchangehandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onchangehandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onchangehandler} value={data.email} type="email" placeholder='Email Address' />
        <input required name='street' onChange={onchangehandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onchangehandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onchangehandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onchangehandler} value={data.zipcode} type="text" placeholder='Zip Code' />
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
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}

export default Placeorder;
