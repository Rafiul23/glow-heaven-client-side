import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const {user} = useAuth();
  const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const {cart} = useCart();
    const price = cart?.reduce((total, item)=> total + parseFloat(item.price), 0);

useEffect(()=>{
axiosSecure.post('/create-payment-intent', {price} )
.then(res =>{
    setClientSecret(res.data.clientSecret);
})
}, [axiosSecure, price])

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError('');
    }

    const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card,
            billing_details: {
                email: user?.email || 'anonymous',
                name: user?.displayName || 'anonymous'
            }
        }
    })

    if(confirmError){
        console.log('error');
    } else {
        if(paymentIntent.status === 'succeeded'){
            // console.log('transaction id', paymentIntent.id);
            setTransactionId(paymentIntent.id);
    
            const payment = {
              email: user?.email,
              price,
              date: new Date(),
              transactionId: paymentIntent.id,
              cartId: cart.map(item => item._id),
              productItemId: cart.map(item => item.productId),
              status: 'pending'
            };
            const res = await axiosSecure.post('/payments',payment);
            // console.log(res.data);
            if(res?.data?.paymentResult?.insertedId && res?.data?.deleteResult?.deletedCount > 0){
              refetch();
              navigate('/dashboard/paymentHistory');
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Your payment is successful",
                showConfirmButton: false,
                timer: 1500
              });
            }
          }
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        className="btn my-5 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-colors duration-300 text-white"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
    </form>
  );
};

export default CheckoutForm;
