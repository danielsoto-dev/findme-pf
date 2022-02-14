import React from "react";

export const StyledErrorMessage = ({ children }) => {
  return (
    <p className="flex items-center font-medium tracking-wide text-red-500 text-xs my-1 ml-1">
      {children}
    </p>
  );
};
