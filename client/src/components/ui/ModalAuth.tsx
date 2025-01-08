import "../Auth/ModalAuth.scss";

type ModalAuthProps = {
  onClose: () => void;
  title: string;
  footerText: string;
  footerActionText: string;
  onFooterAction: () => void;
  children?: React.ReactNode;
};

export default function ModalAuth({
  onClose,
  title,
  footerText,
  footerActionText,
  onFooterAction,
  children,
}: ModalAuthProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="icon-close" onClick={onClose}>
          ×
        </button>

        <h2>{title}</h2>
        <div>{children}</div>

        <p className="auth-prompt">
          {footerText}
          <span onClick={onFooterAction}>{footerActionText}</span>
        </p>
      </div>
    </div>
  );
}
