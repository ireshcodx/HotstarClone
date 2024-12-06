import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import './PaymentGateway.css'

function RazorpayPayment() {
    const navigate = useNavigate();

    const handlePayment = () => {
        const options = {
            key: "rzp_test_wquKp1Dkyy2Nck", // Replace with your Razorpay Test Key
            amount: 14900, // Amount in paise (e.g., ₹149.00 = 14900 paise)
            currency: "INR",
            name: "ManageOne Subscription", // Replace with your app name or subscription name
            description: "3 Months Super Plan",
            image: "https://img.hotstar.com/image/upload/v1656431456/web-images/logo-d-plus.svg", // Optional logo
            handler: function (response) {
                alert(`Payment successful`);
                navigate('/login'); // Navigate to a success page after payment
            },
            prefill: {
                name: "Madhav Lonkar", // Optional pre-filled user info
                email: "madhavlonkar2@gmail.com",
                contact: "9370548600",
            },
            theme: {
                color: "#3399cc", // Custom color for the checkout modal
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

        rzp.on('payment.failed', function (response) {
            alert(`Payment failed! Reason: ${response.error.reason}`);
        });
    };

    return (
        <div>
            <Button variant='contained' fullWidth className="continue-button" onClick={handlePayment}>Continue With Super <NavigateNextIcon /></Button>
        </div>
    );
}

export default RazorpayPayment;
