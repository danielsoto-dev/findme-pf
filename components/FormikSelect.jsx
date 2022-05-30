import React from "react";
import { ErrorMessage, useField } from "formik";

export const FormikSelect = ({
  options = [],
  canSelectEmpty,
  styles,
  label,
  ...props
}) => {
  const [field, meta] = useField(props);
  // console.log(field, meta);
  return (
    <div className={`flex flex-col ${styles}`}>
      <label
        className="text-first-color font-VarelaRound text-sm text-center mb-1"
        htmlFor={field.name}
      >
        {label}
      </label>

      <select
        className={`disabled:opacity-50 border rounded bg-slate-50 h-7 ${
          meta.touched && meta.error && "border-2 border-rose-600"
        }`}
        {...field}
        {...props}
        autoComplete="off"
      >
        <option value="" disabled={!canSelectEmpty}>
          {canSelectEmpty ? "Vacío" : "--Seleccione--"}
        </option>
        {options.map((opt, index) => (
          <option key={index}>{opt}</option>
        ))}
      </select>
      <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  );
};
