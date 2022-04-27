import React from "react";
import { ErrorMessage, useField } from "formik";

export const FormikInput = ({ styles, label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={`flex flex-col ${styles}`}>
      <label
        className="text-first-color font-VarelaRound text-sm text-center mb-1"
        htmlFor={field.name}
      >
        {label}
      </label>
      <input
        className={`border rounded bg-slate-50 h-7 ${
          meta.touched && meta.error && "border-2 border-rose-600"
        }`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage
        component="div"
        name={field.name}
        className="error text-red-500 text-center text-sm italic"
      />
    </div>
  );
};
