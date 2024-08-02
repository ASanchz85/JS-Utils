import React, { useState } from 'react';
import './toggle.css';

interface ToggleProps {
  label: string;
  onChange: (checked: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ label, onChange }) => {
  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked(!checked);
    onChange(!checked);
  };

  return (
    <div className="toggle-container">
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={handleToggle} />
        <span className="slider round"></span>
      </label>
      <span className="label-text">{label}</span>
    </div>
  );
};

export default Toggle;
