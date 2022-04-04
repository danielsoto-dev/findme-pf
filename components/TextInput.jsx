import React from "react";

export const TextInput = ({
  type,
  name,
  placeholder,
  required,
  value,
  onChange,
  label,
  inputStyles,
  labelStyles,
  ...props
}) => {
  return (
    <div class="relative z-0 ">
      <input
        id={name}
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        {...props}
        className={
          "block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer " +
          inputStyles
        }
      />
      {label && (
        <label
          htmlFor={name}
          className={
            "absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 " +
            labelStyles
          }
        >
          {label}
        </label>
      )}
    </div>
  );
};
