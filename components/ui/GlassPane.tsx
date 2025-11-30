import React from 'react';

interface GlassPaneProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const GlassPane: React.FC<GlassPaneProps> = ({ children, className = '', onClick, style }) => {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`
        bg-glass backdrop-blur-2xl border border-glass-border 
        shadow-glass text-glass-text transition-all duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
};