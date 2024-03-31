import { ReactElement } from "react";
import "./Button.css";

type Props = {
  label: ReactElement | string;
  type?: "submit" | "button";
  color?: string;
  onClick?: JSX.IntrinsicElements["button"]["onClick"];
  variation?: "outlined" | "filled";
};

export const Button = ({ label, type, color, onClick, variation }: Props) => {
  let classColor = "btn-blue";
  if (color === "green") {
    classColor = "btn-green";
  } else if (color === "brown") {
    classColor = "btn-brown";
  }

  let classVariation = "filled";
  if (variation === "outlined") {
    classVariation = "btn-outlined";
  }

  return (
    <button
      onClick={onClick}
      className={`btn ${classColor} ${classVariation}`}
      type={type}
    >
      {label}
    </button>
  );
};
