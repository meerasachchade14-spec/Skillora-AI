import React from 'react';

/**
 * Button component – consistent styling for primary and secondary actions.
 *
 * Props:
 * - variant: 'primary' | 'secondary' (default: 'primary')
 * - disabled: boolean
 * - onClick: function
 * - children: node
 */
export default function Button({ variant = 'primary', disabled = false, onClick, children, type = 'button' }) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold transition disabled:opacity-50 disabled:cursor-not-allowed focus-visible';
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:-translate-y-0.5 hover:shadow-xl',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  };
  const className = `${baseClasses} ${variants[variant]}`;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
}
