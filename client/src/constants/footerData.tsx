import { MdMarkEmailUnread } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

type FooterDataProps = {
  title: string;
  content: JSX.Element;
};

export const footerData: FooterDataProps[] = [
  {
    title: "Contact",
    content: (
      <ul>
        <li>
          <p className="footer-items">
            <MdMarkEmailUnread />
            support@chooserIb.com
          </p>
        </li>
        <li>
          <p className="footer-items">
            <BsFillTelephoneFill />
            +33 1 23 45 67 89
          </p>
        </li>
      </ul>
    ),
  },
  {
    title: "Liens utiles",
    content: (
      <ul>
        <li>
          <a className="footer-links-utils" href="/about">
            À propos
          </a>
        </li>
        <li>
          <a className="footer-links-utils" href="/faq">
            FAQ
          </a>
        </li>
        <li>
          <a className="footer-links-utils" href="/contact">
            Contactez-nous
          </a>
        </li>
      </ul>
    ),
  },
  {
    title: "Suivez-nous",
    content: (
      <ul className="social-media">
        <li>
          <a className="social-icon" href="#">
            <FaFacebookF />
          </a>
        </li>
        <li>
          <a className="social-icon" href="#">
            <RiInstagramFill />
          </a>
        </li>
        <li>
          <a className="social-icon" href="#">
            <FaLinkedinIn />
          </a>
        </li>
      </ul>
    ),
  },
];
