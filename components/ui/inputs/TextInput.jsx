import React from 'react';

function TextInput({ value, onChange, placeholder = "Enter your institutional email", label = "Institutional Email Address", type, id}) {

  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={id}
        className="relative block rounded-md bg-white border border-gray-400 p-1 shadow-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black"
      >
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          className="peer border-none bg-white placeholder-white focus:border-gray-800 focus:outline-none focus:ring-0 rounded-md w-full"
          placeholder={placeholder}
          required

        />
        <span className="pointer-events-none absolute start-2.5 bg-white top-0 -translate-y-1/2 p-1 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
          {label}
        </span>
      </label>
    </div>
  );
}

export default TextInput;
