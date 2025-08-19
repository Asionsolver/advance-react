/**
 * Button Component using Render Props Pattern
 * This file contains the Button component which renders a button with a customizable icon.
 * The icon's appearance can change based on hover state and button properties.
 */

import { useState, type ReactElement } from "react";

type IconProps = {
  color: string;
  size?: "large" | "medium" | "small";
};

type IconState = {
  isHovered: boolean;
};

type ButtonProps = {
  renderIcon: (props: IconProps, state: IconState) => ReactElement;
  size?: "large" | "normal";
  appearance?: "primary" | "secondary";
};

export const Button = ({
  renderIcon,
  size = "normal",
  appearance = "primary",
}: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  // create default props
  const defaultIconProps: IconProps = {
    size: size === "large" ? "large" : "medium",
    color: appearance === "primary" ? "white" : "black",
  };

  return (
    <button
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      className={`button ${appearance}`}
      style={{ color: "black", width: "120px" }}
    >
      Submit {renderIcon(defaultIconProps, { isHovered })}
    </button>
  );
};
