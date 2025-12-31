
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'accent' | 'darker';
}

const Card: React.FC<CardProps> = ({ children, className = '', variant = 'default' }) => {
  const baseClasses = 'p-6 rounded-xl shadow-lg transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50',
    accent: 'bg-gradient-to-br from-cyan-500/20 to-transparent border border-cyan-500/30',
    darker: 'bg-black/30 backdrop-blur-sm border border-gray-800/60',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
