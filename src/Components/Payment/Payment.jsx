import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_API_KEY);

const Payment = () => {
    return (
        <div>
            <SectionTitle
            subHeading={'Please pay for your products'}
            heading={'Payment'}
            ></SectionTitle>
            <div>
                <Elements></Elements>
            </div>
        </div>
    );
};

export default Payment;