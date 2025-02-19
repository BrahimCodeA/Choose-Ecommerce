import "./Success.scss";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import useCart from "@/hooks/useCart";

const Success = () => {
  const dispatch = useDispatch();
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [dispatch]);

  return (
    <div className="success-container">
      <h2 className="success-title">Paiement réussi ! 🎉</h2>
      <p className="success-message">Merci pour votre confiance.</p>
      <Link to="/" className="success-link">
        Continuez vos achats
      </Link>
    </div>
  );
};

export default Success;
