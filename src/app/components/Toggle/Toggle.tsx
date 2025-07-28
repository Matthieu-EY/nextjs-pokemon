import React from 'react';
import './Toggle.css';

interface ToggleProps {
  isOn?: boolean;
  handleToggle: () => void;
  onLabel?: React.ReactNode;
  offLabel?: React.ReactNode;
}

export function Toggle({
  isOn,
  handleToggle,
  onLabel = 'On',
  offLabel = 'Off',
}: ToggleProps) {
  return (
    <div className="toggle-container">
      <span>{offLabel}</span>
      <div
        className={`toggle-switch ${isOn ? 'toggle-on' : ''}`}
        onClick={handleToggle}
        role="switch"
        aria-checked={isOn}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleToggle();
        }}
      >
        <div className="switch-handle"></div>
      </div>
      <span>{onLabel}</span>
    </div>
  );
}
export default Toggle;
