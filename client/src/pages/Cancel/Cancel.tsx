import "./Cancel.scss";
import { Link } from "react-router-dom";

const CancelPage = () => {
  return (
    <div className="cancel-container">
      <h1 className="cancel-title">Paiement annulé</h1>
      <p className="cancel-message">
        Le paiement a été annulé. Vous pouvez réessayer plus tard.
      </p>
      <Link to="/" className="cancel-link">
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default CancelPage;
