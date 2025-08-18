// Footer component (renders a close button)
export const Footer = ({ onClose }: { onClose: () => void }) => {
  console.log("👉 Footer rendered");
  return (
    <button onClick={onClose} className="footer-close-btn">
      Close
    </button>
  );
};
