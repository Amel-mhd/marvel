import React from 'react';
import './Button.css';

function ButtonSecondary({ children, onClick, disabled }) {
  return (
    <button
      className="btn btn--secondary"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default ButtonSecondary;