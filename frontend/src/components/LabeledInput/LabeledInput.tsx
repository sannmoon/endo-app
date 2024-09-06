import React from "react";

type Props = {
  label: string;
  errors?: string;
} & React.PropsWithoutRef<JSX.IntrinsicElements["input"]>;

export const LabeledInput = React.forwardRef<HTMLInputElement, Props>(
  ({ label, errors, ...props }: Props, ref) => {
    return (
      <div className="mb-6 flex flex-col">
        <label htmlFor={props.name}>{label}</label>
        <input
          className="rounded-md border border-[#acadb0] no need to put border-solid aye h-10 text-base pl-2.5 mt-2.5"
          {...props}
          ref={ref}
        />
        {errors && (
          <p className="form-text-red-500 opacity-70 text-sm m-0  pt-1.5">
            {errors}
          </p>
        )}
      </div>
    );
  }
);
