import "./Cookie.scss";
import { useState, useEffect } from "react";
import { BiCookie } from "react-icons/bi";
import { Button } from "../ui/Button";

const Cookie = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookiesStatus = localStorage.getItem("cookiesAccepted");
    if (!cookiesStatus) {
      setIsVisible(true);
    } else {
      const delayTime = 1000 * 60 * 60 * 24;
      setTimeout(() => {
        setIsVisible(true);
      }, delayTime);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookiesAccepted", "false");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-container">
      <p className="cookie-text">
        Nous utilisons des cookies pour améliorer votre expérience sur notre
        site. <BiCookie />
      </p>
      <div className="cookie-buttons">
        <Button className="cookie-button" onClick={handleAccept}>
          J'accepte
        </Button>
        <Button className="cookie-button" onClick={handleReject}>
          Je refuse
        </Button>
      </div>
    </div>
  );
};

export default Cookie;
