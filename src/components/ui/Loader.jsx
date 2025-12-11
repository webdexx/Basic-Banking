import { createPortal } from "react-dom";
import LoaderAnimation from "@assets/images/loader.gif"

export default function Loader({ isOpen, onClose }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="backdrop" onClick={onClose} style={backdropStyle}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{
        width: "150px",
        height: "150px",
        background: "transparent"
      }}>
        <img src={LoaderAnimation} alt="" />
      </div>
    </div>,
    document.body
  );
}

const backdropStyle = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(41, 41, 41, 0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 99999, // ✅ Always on top
};
