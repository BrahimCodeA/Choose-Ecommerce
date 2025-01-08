import { FaPlus, FaMinus } from "react-icons/fa";

type FooterSectionProps = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  toggleSection: () => void;
};

export default function FooterSection({
  title,
  children,
  isOpen,
  toggleSection,
}: FooterSectionProps) {
  return (
    <section className="footer-section">
      <div className="rubrique" onClick={toggleSection}>
        <h3 className="footer-rubrique-title">{title}</h3>
        <span className="footer-plus">{isOpen ? <FaMinus /> : <FaPlus />}</span>
      </div>
      <div
        className={`footer-sous-rubrique ${
          isOpen ? "" : "footer-sous-rubrique-hidden"
        }`}
      >
        {children}
      </div>
    </section>
  );
}
