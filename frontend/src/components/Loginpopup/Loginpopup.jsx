import React, {  useContext, useEffect, useState } from 'react'
import './Loginpopup.css'
import {assets} from '../../assets/assets'
import { Storecontext } from '../../Context/Storecontext';
import axios from 'axios'
import { toast } from 'react-toastify';

function Loginpopup({ setshowlogin }) {
  const {url,token ,settoken } = useContext(Storecontext);
  const [currState, Setcurrstate] = useState("Login");
  
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onchangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata((data) => {
      return { ...data, [name]: value };
    });
  };
  
 

  const onlogin = async (event) => {
    event.preventDefault();
    let newurl = url;
  
    if (currState === "Login") {
      newurl += "/api/user/login";
    } else {
      newurl += "/api/user/register";
    }
  
    try {
      const response = await axios.post(newurl, data);
  
      if (response.data.success) {
        settoken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        setshowlogin(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Error occurred");
      } else if (error.request) {
        toast.error("No response from server");
      } else {
        toast.error("Request failed");
      }
    }
  };
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto'; 
    };
  }, []);
  
  


  return (
    <div className='loginpopup'>
      <form onSubmit={onlogin} className="login-popup-continer">
        <div className="login-popup-title">
          <h2 className='font-bold'>{currState}</h2>
          <img onClick={() => setshowlogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs ">
          {currState === "Login" ? <></> : 
          <input name='name' value={data.name} onChange={onchangehandler} type="text" placeholder='Your name' required />}
          
          <input name='email' value={data.email} onChange={onchangehandler} type="email" placeholder='Your email' required />
          <input name='password' value={data.password} onChange={onchangehandler} type="password" placeholder='Your password' required />
        </div>
        <button type='subbmit' > {currState === "Login" ? "Login" : "Create Account"} </button>

        {
          currState === "Login" ?
            <p>Create a new account? <span onClick={() => Setcurrstate("sign up")} className='spa'>Click here</span></p> :
            <p onClick={() => Setcurrstate("Login")} className='spa'>Already have an account? <span>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default Loginpopup;
