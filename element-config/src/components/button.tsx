/**
 * Importing ReactNode type from React for type-checking children props
 */
// import type { ReactNode } from "react";

// type ButtonProps = {
//   onClick: () => void;
//   children: ReactNode;
// };
// export const Button = ({ onClick, children }: ButtonProps) => {
//   return (
//     <button onClick={onClick} className="button">
//       {children}
//     </button>
//   );
// };

import {
  cloneElement,
  type ComponentProps,
  type ElementType,
  type ReactElement,
} from "react";

type ButtonProps<T extends ElementType> = {
  icon: ReactElement<ComponentProps<T>>;
  size?: "large" | "normal";
  appearance?: "primary" | "secondary";
};
export const Button = <T extends ElementType>({
  icon,
  size = "normal",
  appearance = "primary",
}: ButtonProps<T>) => {
  // create default props
  const defaultIconProps = {
    size: size === "large" ? "large" : "medium",
    color: appearance === "primary" ? "white" : "black",
  };
  const newProps = {
    ...defaultIconProps,
    // make sure that props that are coming from the icon override default if they exist
    ...icon.props,
  };

  // clone the icon and assign new props to it
  const clonedIcon = cloneElement(icon, newProps);

  return (
    <button className={`button ${appearance}`}>Submit {clonedIcon}</button>
  );
};
