import { createPortal } from "react-dom";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="backdrop" onClick={onClose} style={backdropStyle}>
      <div className="modal" onClick={e => e.stopPropagation()} style={modalStyle}>
        {children}
      </div>
    </div>,
    document.body
  );
}

const backdropStyle = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 99999, // ✅ Always on top
};

const modalStyle = {
  background: "#fff",
  padding: "24px",
  borderRadius: "12px",
  minWidth: "200px",
  maxWidth: "50vw",
  maxHeight: "50vh",
  overflowY: "auto",
  boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
  transform: "scale(1)",
  margin: "0 auto",
};