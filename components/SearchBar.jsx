import React, { useState } from "react";
import { TextInput } from "./TextInput";
export const SearchBar = () => {
  const [formFilters, setFormFilters] = useState({
    fullName: "",
    age: "",
    location: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFilters({
      ...formFilters,
      [name]: value,
    });
  };
  return (
    <form className="mb-20 flex items-center justify-end gap-6 px-20" action="">
      <TextInput
        type="text"
        onChange={handleChange}
        value={formFilters.name}
        name="fullName"
        placeholder="Full Name"
      />
      <TextInput
        type="number"
        onChange={handleChange}
        value={formFilters.age}
        name="age"
        placeholder="Age"
        min={0}
        max={100}
        inputStyles="min-w-[6ch]"
      />
      <button>Submit</button>
    </form>
  );
};
