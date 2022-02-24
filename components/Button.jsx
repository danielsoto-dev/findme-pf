import React from "react";

export const Button = ({ children, ...props }) => {
  const { className } = props;
  return (
    <button
      {...props}
      className={`bg-transparent border-[1px] border-black rounded-md px-2 py-[5px] ${className}`}
    >
      {children}
    </button>
  );
};
