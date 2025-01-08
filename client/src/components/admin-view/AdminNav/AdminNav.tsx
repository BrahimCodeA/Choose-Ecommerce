import "./AdminNav.scss";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { useHandleLogout } from "@/hooks/useHandleLogout";

export default function AdminNav() {
  const { handleLogout } = useHandleLogout();

  return (
    <div className="navbar-options">
      <Link to="/admin" className="navbar-link">
        <h2 className="navbar-title">Choose ©</h2>
      </Link>
      <Button className="navbar-logout" onClick={handleLogout}>
        Déconnexion
      </Button>
    </div>
  );
}
