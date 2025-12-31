
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-8 py-3 font-bold text-white bg-cyan-500 rounded-lg hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 shadow-lg shadow-cyan-500/20 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
