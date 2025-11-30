import React from 'react';
import { GlassPane } from './ui/GlassPane';
import { WindowState } from '../types';

interface DockProps {
  windows: WindowState[];
  activeId: string | null;
  onAppClick: (id: string) => void;
}

export const Dock: React.FC<DockProps> = ({ windows, activeId, onAppClick }) => {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <GlassPane className="px-4 py-3 rounded-full flex items-center space-x-4">
        {windows.map((app) => (
          <button
            key={app.id}
            onClick={() => onAppClick(app.id)}
            className="group relative flex flex-col items-center justify-center transition-all duration-300 ease-out hover:-translate-y-2"
          >
            {/* Tooltip */}
            <span className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-black/50 px-2 py-1 rounded-full backdrop-blur-md border border-white/10">
              {app.title}
            </span>

            {/* Icon Container */}
            <div 
              className={`
                w-12 h-12 rounded-full flex items-center justify-center text-white
                transition-all duration-300 border border-white/10
                ${app.isOpen && !app.isMinimized ? 'bg-white/20 shadow-glass-hover' : 'bg-white/5 hover:bg-white/10'}
                ${activeId === app.id ? 'ring-1 ring-white/50' : ''}
              `}
            >
              {app.icon}
            </div>
            
            {/* Active Dot indicator */}
            <div className={`
              w-1.5 h-1.5 rounded-full bg-white mt-2 transition-all duration-300
              ${app.isOpen ? 'opacity-100' : 'opacity-0'}
            `}></div>
          </button>
        ))}
      </GlassPane>
    </div>
  );
};