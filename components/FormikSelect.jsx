import React from "react";
import { ErrorMessage, useField } from "formik";

export const FormikSelect = ({ options, styles, label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={`flex flex-col ${styles}`}>
      <label
        className="text-first-color font-VarelaRound text-sm text-center mb-1"
        htmlFor={field.name}
      >
        {label}
      </label>
      <select
        className={`border rounded bg-slate-50 h-7 ${
          meta.touched && meta.error && "border-2 border-rose-600"
        }`}
        {...field}
        {...props}
        autoComplete="off"
      >
        {options.map((opt, index) => (
          <option key={index}>{opt}</option>
        ))}
      </select>
      <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  );
};
