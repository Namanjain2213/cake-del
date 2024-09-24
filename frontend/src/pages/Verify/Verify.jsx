import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Storecontext } from '../../Context/Storecontext';
import axios from 'axios';

function Verify() {
    const [searchparams] = useSearchParams();
    const razorpayOrderId = searchparams.get("razorpay_order_id");
    const razorpayPaymentId = searchparams.get("razorpay_payment_id");
    const razorpaySignature = searchparams.get("razorpay_signature");
    const orderId = searchparams.get("orderId");
    const { url } = useContext(Storecontext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
            const response = await axios.post(`${url}/api/order/verify`, {
                razorpay_order_id: razorpayOrderId,
                razorpay_payment_id: razorpayPaymentId,
                razorpay_signature: razorpaySignature,
                orderId: orderId,
            });

            if (response.data.success) {
                navigate("/myorders"); // Redirect to My Orders page on success
            } else {
                navigate("/"); // Redirect to home on failure
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            navigate("/"); // Redirect to home on error
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className='verify'>
            <div className="spinner">
                {/* Add your spinner/loading animation here */}
            </div>
        </div>
    );
}

export default Verify;
