import React from 'react';
import './Button.css';

function ButtonPrimary({ children, onClick, disabled }) {
  return (
    <button
      className="btn btn--primary"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default ButtonPrimary;