import React from 'react';
import { collegeOptions } from '@/lib/inputOptions';

const DepartmentDropdown = ({ value, options, onChange }) => (
  <select value={value} onChange={onChange}>
    {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const Dropdown = ({
    label,
    value,
    onChange,
    readOnly,
    disabled,
    dropdownOptions,
    isEditMode,
  }) => (
    <div className="w-full md:w-full">
      {isEditMode ? (
        <DepartmentDropdown value={value} options={dropdownOptions} onChange={onChange} />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          readOnly={readOnly}
          disabled={disabled}
        />
      )}
    </div>
  );
  
export default Dropdown;
