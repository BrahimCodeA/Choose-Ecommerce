import "./AdminLinks.scss";
import { Link, useLocation } from "react-router-dom";
import { CiBoxList, CiHome } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";

const AdminLinks = () => {
  const location = useLocation();

  return (
    <div className="admin-links">
      <Link
        to="/admin/add"
        className={`admin-link ${
          location.pathname === "/admin/add" ? "active" : ""
        }`}
      >
        <span>
          Ajouter un produit <IoMdAddCircleOutline />
        </span>
      </Link>

      <Link
        to="/admin/list"
        className={`admin-link ${
          location.pathname === "/admin/list" ? "active" : ""
        }`}
      >
        <span>
          Liste de produits <CiBoxList />
        </span>
      </Link>
      <Link to="/" className="admin-link">
        <span>
          Retour au site <CiHome />
        </span>
      </Link>
    </div>
  );
};

export default AdminLinks;
