import React from "react";

export const Button = ({ onClick, children, ...props }) => {
  const { className } = props;
  return (
    <button
      className={`bg-transparent border-[1px] border-black rounded-md px-2 py-[5px] ${className}`}
    >
      {children}
    </button>
  );
};
