import "./Footer.scss";
import { useState } from "react";
import FooterSection from "./FooterSection";
import { footerData } from "@/constants/footerData";

export default function Footer() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const date = new Date();

  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <footer className="footer">
      <h2>CHOOSE</h2>
      <div className="footer-container">
        {footerData.map(({ title, content }, index) => (
          <FooterSection
            key={index}
            title={title}
            toggleSection={() => toggleSection(index)}
            isOpen={openIndex === index}
          >
            {content}
          </FooterSection>
        ))}
      </div>

      <div className="footer-bottom">
        <p>&copy; {date.getFullYear()} Choose. Tous droits réservés</p>
      </div>
    </footer>
  );
}
