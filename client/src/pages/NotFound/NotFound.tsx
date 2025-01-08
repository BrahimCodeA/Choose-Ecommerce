import "./NotFound.scss";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__message">
          Oups ! La page que vous recherchez semble introuvable.
        </p>
        <Link to="/" className="not-found__button">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
