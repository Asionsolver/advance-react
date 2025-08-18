import type { ReactNode } from "react";

// ModalDialog component
export const ModalDialog = ({
  children,
  footer,
  onClose,
}: {
  children: ReactNode;
  footer: ReactNode;
  onClose: () => void;
}) => {
  console.log("👉 ModalDialog rendered");

  return (
    <div className="modal-background">
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <h3 style={{ margin: 0 }}>Modal Title</h3>
          <button onClick={onClose} className="modal-header-close-button">
            ✖
          </button>
        </div>

        {/* Content */}
        <div className="content" style={{ marginBottom: "15px" }}>
          {children}
        </div>

        {/* Footer */}
        <div className="footer" style={{ textAlign: "right" }}>
          {footer}
        </div>
      </div>
    </div>
  );
};
