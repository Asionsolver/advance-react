import type { ReactNode } from "react";

type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
};
export const Button = ({ onClick, children }: ButtonProps) => {
  console.log("Button component rendered");
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-gray-400 text-white rounded border border-gray-800 hover:bg-gray-600"
    >
      {children}
    </button>
  );
};
