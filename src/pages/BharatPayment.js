import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const BharatPayment = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailPattern.test(email)) {
      alert("Wrong email format. Please enter a valid email.");
      return;
    }
  
    // Step 2: Verify the email
    try {
      const verifyEmailUrl = `${process.env.REACT_APP_AWS_PUBLIC_LINK}/api/payment/verify-email`;
      const { data: emailResponse } = await axios.post(verifyEmailUrl, { email });
  
      if (!emailResponse.exists) {
        alert("Email does not exist in our records.");
        return;
      } else {
        
        const orderUrl = `${process.env.REACT_APP_AWS_PUBLIC_LINK}/api/payment/order`; 
        const orderData = {
          amount: 3, 
          email: email, 
        };
        
        const { data } = await axios.post(orderUrl, orderData);
  
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID, 
          amount: data.amount,
          currency: data.currency,
          name: "IIC",
          description: "Payment for your Bharat event",
          image: "/logo-3-1@2x.png", 
          order_id: data.orderId, 
          handler: async function (response) {
            const verifyUrl = `${process.env.REACT_APP_AWS_PUBLIC_LINK}/api/payment/verify`; 
            const paymentData = {
              order_id: data.orderId,
              payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              email: email, 
            };
            
            const { data: verifyResponse } = await axios.post(verifyUrl, paymentData);
            
            if (verifyResponse.success) {
              alert("Payment verified successfully!");
              window.location.href = 'https://chat.whatsapp.com/DOWcmHIbH2l7OeFwBdqCWI';
            } else {
              alert("Payment verification failed");
            }
          },
          prefill: {
            name: "John Doe", 
            email: email, 
            contact: "9999999999", 
          },
          theme: {
            color: "#3399cc", 
          },
        };
  
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      }
  
    } catch (error) {
      console.error("Error in email verification or processing payment:", error);
      alert("Something went wrong.");
    }
  };
  
  
  

  return (
    <>
    <div className='container text-center' style={{ marginTop:'20px', padding: '20px', maxWidth: '400px', margin: 'auto', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
      <label style={{ marginBottom: '8px', fontWeight: 'bold', color: '#333', fontSize: '14px' }}>
        Email Address:
      </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email which is filled before"
        required
        style={{
          padding: '12px',
          border: '1px solid #2A2A72', // Default dark blue border
          borderRadius: '4px',
          fontSize: '16px',
          outline: 'none',
          transition: 'border-color 0.3s, box-shadow 0.3s',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#6A0DAD'; // Purple border on focus
          e.target.style.boxShadow = '0 0 8px rgba(106, 13, 173, 0.4)'; // Add a subtle purple glow on focus
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#2A2A72'; // Revert to dark blue on blur
          e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)'; // Reset shadow on blur
        }}
      />
    </div>
  
    <button 
      onClick={handlePayment}
      style={{
        padding: '12px 20px',
        backgroundColor: '#6A0DAD', // Purple background
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.2s',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#5a0bb3'; // Darker purple on hover
        e.target.style.transform = 'translateY(-2px)'; // Slight lift on hover
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = '#6A0DAD'; // Reset background
        e.target.style.transform = 'translateY(0)'; // Reset position
      }}
    >
      Pay with Razorpay
    </button>
  </div>

  </>

  );
};

export default BharatPayment;
