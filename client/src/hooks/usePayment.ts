import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import useCart from "./useCart";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

if (!stripePromise) {
  console.error("⚠️ ERREUR: La clé Stripe n'est pas définie !", stripePromise);
}

const usePayment = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { cart } = useCart();

  const makePayment = async () => {
    const stripe = await stripePromise;

    if (!stripe) {
      console.error("Stripe n'a pas pu être chargé correctement.");
      return;
    }

    setIsSubmitting(true);
    const body = { products: cart };

    try {
      const response = await axios.post(
        `/api/payment/create-payment-intent`,
        body
      );

      if (!response.data || !response.data.id) {
        throw new Error("Réponse de session Stripe invalide.");
      }

      const session = response.data;
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error("Erreur lors du paiement:", result.error.message);
      }
    } catch (error) {
      console.error("Erreur lors de la redirection vers le checkout:", error);
      alert("Erreur lors du paiement. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, makePayment };
};

export default usePayment;
