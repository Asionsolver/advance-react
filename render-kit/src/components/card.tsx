// ! v01:Normal Way
// ! cloneElement (creates a copy of an element and adds new props)

// import {
//   cloneElement,
//   isValidElement,
//   useState,
//   type ReactElement,
//   type ReactNode,
// } from "react";
// type CardProps = {
//   header: ReactElement<{ onClick?: () => void; style?: React.CSSProperties }>;
//   content: ReactNode;
// };

// function Card({ header, content }: CardProps) {
//   const [isActive, setIsActive] = useState<boolean>(false);
//   const toggle = () => setIsActive((prev) => !prev);

//   let enhancedHeader = header;

//   // Problem here: if header is an element then it needs to be cloned
//   if (isValidElement(header)) {
//     enhancedHeader = cloneElement(header, {
//       onClick: toggle,
//       style: { color: isActive ? "red" : "black" },
//     });
//   }
//   return (
//     <div>
//       <div className="header">{enhancedHeader}</div>
//       <div className="content">{content}</div>
//     </div>
//   );
// }

// export default Card;

// ! v02: Render Props Pattern
// ! header as a function
import { useState, type ReactNode } from "react";
type CardProps = {
  header: (isActive: boolean, toggle: () => void) => ReactNode;
  content: ReactNode;
};

function Card({ header, content }: CardProps) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const toggle = () => setIsActive((prev) => !prev);

  return (
    <div>
      <div className="header">{header(isActive, toggle)}</div>
      <div className="content">{content}</div>
    </div>
  );
}

export default Card;
