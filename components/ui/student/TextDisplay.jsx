import React from 'react';

function TextDisplay({ value, label, readOnly, disabled}) {
  return (
    <div className="flex flex-col w-full">
      <label className="relative block rounded-md bg-white border border-gray-400 p-1 shadow-sm">

        <input
          type="text"
          value={value}
          readOnly = {readOnly}
          className="peer border-none bg-white placeholder-white focus:outline-none focus:ring-0 rounded-md w-full"
          placeholder=" "
          disabled = {disabled}
        />
        <span className="pointer-events-none absolute start-2.5 bg-white top-0 -translate-y-1/2 p-1 text-xs transition-all">
          {label}
        </span>
      </label>
    </div>
  );
}

export default TextDisplay;
