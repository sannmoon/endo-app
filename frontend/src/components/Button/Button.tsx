import { ReactElement } from "react";

type Props = {
  label: ReactElement | string;
  type?: "submit" | "button";
  color?: string;
  onClick?: JSX.IntrinsicElements["button"]["onClick"];
  variation?: "outlined" | "filled";
};

export const Button = ({ label, type, color, onClick, variation }: Props) => {
  const outlined = `border border-solid	rounded-md bg-transparent`;

  let filledClassColor = `bg-c-blue`;
  let outlinedClassColor = `border-c-blue text-c-blue`;
  if (color === "green") {
    filledClassColor = `bg-c-green`;
    outlinedClassColor = "border-c-green text-c-green";
  } else if (color === "brown") {
    filledClassColor = `bg-c-brown`;
    outlinedClassColor = "border-c-brown text-c-brown";
  }

  return (
    <button
      onClick={onClick}
      className={`${
        variation === "outlined"
          ? `${outlinedClassColor} ${outlined}`
          : `${filledClassColor} text-white`
      } p-4 rounded-md cursor-pointer text-lg w-full`}
      type={type}
    >
      {label}
    </button>
  );
};
