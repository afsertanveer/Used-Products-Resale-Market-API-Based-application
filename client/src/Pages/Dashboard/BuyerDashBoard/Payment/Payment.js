import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import useTitle from './../../../../hooks/useTitle';
import CheckOutForm from './CheckOutForm';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
const Payment = () => {
  useTitle('Payment');
    const bookedPhone = useLoaderData();
   
    const { model, askingPrice } = bookedPhone;
    return (
      <div>
        <h3 className="text-3xl">Payment for {model}</h3>
        <p className="text-xl">
          Please pay <strong>{askingPrice} TK</strong>
        </p>
        <div className="w-96 my-12">
          <Elements stripe={stripePromise}>
            <CheckOutForm bookedPhone={bookedPhone} />
          </Elements>
        </div>
      </div>
    );
};

export default Payment;