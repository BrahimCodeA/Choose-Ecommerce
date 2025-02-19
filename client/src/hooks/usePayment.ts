import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import useCart from "./useCart";

const usePayment = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { cart } = useCart();
  const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

  const makePayment = async () => {
    const stripe = await loadStripe(STRIPE_PUBLIC_KEY);

    if (!stripe) {
      console.error("Stripe n'a pas pu être chargé correctement.");
      return;
    }
    setIsSubmitting(true);
    const body = {
      products: cart,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/payment/create-payment-intent",
        body
      );

      const session = response.data;
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error(
          "Erreur lors de la redirection vers le checkout:",
          result.error
        );
      }
    } catch (error) {
      console.log("Erreur lors de la redirection vers le checkout:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return { isSubmitting, makePayment };
};

export default usePayment;
