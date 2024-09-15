import React, { useContext, useEffect } from 'react'
import './Verify.css'
import {useNavigate, useSearchParams} from 'react-router-dom'
import { Storecontext } from '../../Context/Storecontext';
import axios from 'axios';
function Verify() {
 
    const [searchparams, setsearhcparams] = useSearchParams();
    const success = searchparams.get("success");
    const orderId = searchparams.get("orderId");
    const {url} = useContext(Storecontext);
    const navigate = useNavigate();
    const verifyPayment = async () => {
     const response = await axios.post(url+"/api/order/verify",{success,orderId});
     if(response.data.success){
      navigate("/myorders");
     }
     else{
        navigate("/");
     }
   }

   useEffect(()=>{
    verifyPayment();
   },[]);
   
    return (
    <div className='verify' >
        <div className="spinner">

        </div>

    </div>
  )
}

export default Verify