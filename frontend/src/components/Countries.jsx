import React from "react";

const Countries = ({ countries, onChange, placeholder, className }) => {
  const handleChange = (e) => {
    debugger;
    onChange(e.target.value);
  };

  return (
    <select
      style={{ width: "100%" }}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
    >
      {countries.map((country, index) => (
        <option key={index}>{country.name}</option>
      ))}
    </select>
  );
};

export default Countries;
