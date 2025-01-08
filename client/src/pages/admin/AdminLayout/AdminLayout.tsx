import "./AdminLayout.scss";
import { Outlet } from "react-router-dom";
import AdminNav from "@/components/admin-view/AdminNav/AdminNav";
import AdminLinks from "@/components/admin-view/AdminLinks/AdminLinks";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminNav />
      <div className="admin-content">
        <h2>Tableau de bord</h2>
        <AdminLinks />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
