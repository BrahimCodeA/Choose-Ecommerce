import { useNavigate } from "react-router-dom";

export const useButtonActions = (
  openModal: (modalType: "signIn" | "signUp") => void
) => {
  const navigate = useNavigate();

  return {
    navigateToProfile: () => navigate("/profile"),
    openSignInModal: () => openModal("signIn"),
    openSignUpModal: () => openModal("signUp"),
  };
};
