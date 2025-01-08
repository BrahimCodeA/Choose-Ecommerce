import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/slices/userSlice";
import { ToastType, showToast } from "@/utils/toastUtils";

export const useHandleLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    showToast("Déconnexion réussie !", ToastType.SUCCESS);
  };

  return { handleLogout };
};
