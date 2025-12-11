import { createPortal } from "react-dom";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="backdrop" onClick={onClose} style={backdropStyle}>
      <div className="modal" onClick={e => e.stopPropagation()} >
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
