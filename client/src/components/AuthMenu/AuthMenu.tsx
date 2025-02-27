import "./AuthMenu.scss";
import { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { Button } from "../ui/Button";
import SignInModals from "../Auth/SignInModals";
import SignUpModals from "../Auth/SignUpModals";
import { useButtonActions } from "@/hooks/useAuthButtonsActions";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FaSignOutAlt } from "react-icons/fa";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { useHandleLogout } from "@/hooks/useHandleLogout";
import { useNavigate } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";

type ModalType = "signIn" | "signUp" | null;

export default function AuthMenu() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const user = useSelector((state: RootState) => state.users.user);
  const navigate = useNavigate();
  const { handleLogout } = useHandleLogout();

  const openModal = (modalType: ModalType) => setActiveModal(modalType);
  const buttonActions = useButtonActions(openModal);

  return (
    <>
      <div
        className="avatar-modals"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <RxAvatar className="user-icon" />
        {isHovered && (
          <div className="avatar-modals-links">
            {!user ? (
              <>
                <Button
                  children="Connexion"
                  icon={<FaSignInAlt />}
                  className="btn-signin"
                  onClick={buttonActions["openSignInModal"]}
                />
                <Button
                  children="Inscription"
                  icon={<FaUserPlus />}
                  className="btn-signup"
                  onClick={buttonActions["openSignUpModal"]}
                />
              </>
            ) : (
              <>
                {user.role === "admin" && (
                  <Button
                    children="Admin"
                    icon={<RiAdminFill />}
                    className="btn-admin"
                    onClick={() => navigate("/admin")}
                  />
                )}
                <Button
                  children="Déconnexion"
                  icon={<FaSignOutAlt />}
                  className="btn-logout"
                  onClick={handleLogout}
                />
              </>
            )}
          </div>
        )}
      </div>

      {activeModal === "signIn" && (
        <SignInModals
          onClose={() => setActiveModal(null)}
          openSignUp={() => openModal("signUp")}
        />
      )}
      {activeModal === "signUp" && (
        <SignUpModals
          onClose={() => setActiveModal(null)}
          openSignIn={() => openModal("signIn")}
        />
      )}
    </>
  );
}
