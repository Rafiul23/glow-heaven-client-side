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
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { cart, refetch } = useCart();
  const price = cart?.reduce(
    (total, item) => total + parseFloat(item.price),
    0
  );

  const [reducedPrice, setReducedPrice] = useState(price);
  const [disabled, setDisabled] = useState(false);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const form = e.target;
    const coupon = form.coupon.value;
    if (coupon === "MAKEUP1000") {
      const currentPrice = parseFloat(price) - (parseFloat(price) * 20) / 100;
      setReducedPrice(currentPrice);
      setDisabled(true);
    } else {
      setReducedPrice(price);
    }
  };

  useEffect(()=>{
    if(price >= 1000){
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [price])

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price: reducedPrice }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, price]);

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
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("error");
    } else {
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        const payment = {
          email: user?.email,
          price,
          date: new Date(),
          transactionId: paymentIntent.id,
          cartId: cart.map((item) => item._id),
          productItemId: cart.map((item) => item.productId),
          status: "pending",
        };
        const res = await axiosSecure.post("/payments", payment);
        console.log(res.data);
        if (
          res?.data?.paymentResult?.insertedId &&
          res?.data?.deleteResult?.deletedCount > 0
        ) {
          refetch();
          navigate("/dashboard/paymentHistory");
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your payment is successful",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between my-5 items-center">
        <div>
          <h3 className="text-xl font-bold">Price: $ {reducedPrice}</h3>
        </div>
        <div>
        <button
        disabled={disabled}
        className="btn my-5 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-colors duration-300 text-white"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Apply Coupon
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold my-4 text-lg">
            Write the coupon code below:
          </h3>
          <form onSubmit={handleApplyCoupon}>
            <input
              type="text"
              placeholder="Write coupon"
              name="coupon"
              className="input input-bordered input-success mr-2 w-full max-w-xs"
            />
            <button className="btn bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-colors duration-300 text-white">
              Apply
            </button>
          </form>
          <div className="modal-action relative justify-end -right-4 -top-[72px]">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn bg-red-500 text-white hover:bg-red-600">Close</button>
            </form>
          </div>
            
        </div>
      </dialog>
        </div>
      </div>

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
    </div>
  );
};

export default CheckoutForm;
