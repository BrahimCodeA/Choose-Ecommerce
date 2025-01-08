import { VscAccount } from "react-icons/vsc";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

type ButtonDataProps = {
  title: string;
  icon: JSX.Element;
  className: string;
  onClick: "navigateToProfile" | "openSignInModal" | "openSignUpModal";
};

export const buttonData: ButtonDataProps[] = [
  {
    title: "Compte",
    icon: <VscAccount />,
    className: "btn-profile",
    onClick: "navigateToProfile",
  },
  {
    title: "Connexion",
    icon: <FaSignInAlt />,
    className: "btn-signin",
    onClick: "openSignInModal",
  },
  {
    title: "Inscription",
    icon: <FaUserPlus />,
    className: "btn-signup",
    onClick: "openSignUpModal",
  },
];
