import React, { useState, useEffect, useRef } from 'react';
import { GlassPane } from './ui/GlassPane';
import { X, Minus } from 'lucide-react';
import { WindowState, Position, Size } from '../types';

interface SpatialWindowProps {
  window: WindowState;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onFocus: (id: string) => void;
  onMove: (id: string, pos: Position) => void;
  onResize: (id: string, size: Size) => void;
}

export const SpatialWindow: React.FC<SpatialWindowProps> = ({ 
  window, 
  onClose, 
  onMinimize, 
  onFocus,
  onMove,
  onResize
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = useState({ width: 0, height: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging) {
        onMove(window.id, {
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
      
      if (isResizing) {
          const deltaX = e.clientX - startPos.x;
          const deltaY = e.clientY - startPos.y;
          
          onResize(window.id, {
              width: Math.max(300, startSize.width + deltaX),
              height: Math.max(200, startSize.height + deltaY)
          });
      }
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    }

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, isResizing, dragOffset, startSize, startPos, onMove, onResize, window.id]);

  const handleDragStart = (e: React.PointerEvent) => {
    e.preventDefault();
    onFocus(window.id);
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  const handleResizeStart = (e: React.PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onFocus(window.id);
      setStartPos({ x: e.clientX, y: e.clientY });
      setStartSize({ width: window.size.width, height: window.size.height });
      setIsResizing(true);
  }

  if (!window.isOpen || window.isMinimized) return null;

  return (
    <div
      ref={windowRef}
      style={{
        position: 'absolute',
        left: window.position.x,
        top: window.position.y,
        width: window.size.width,
        height: window.size.height,
        zIndex: window.zIndex,
      }}
      className="transition-[width,height] duration-75 ease-linear will-change-transform"
      onPointerDown={() => onFocus(window.id)}
    >
      <GlassPane className="w-full h-full rounded-[2rem] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300 select-none ring-1 ring-white/10 shadow-2xl">
        {/* Window Bar (Draggable Area) */}
        <div 
          className="h-12 flex items-center justify-between px-6 border-b border-white/5 cursor-grab active:cursor-grabbing bg-white/5 shrink-0"
          onPointerDown={handleDragStart}
        >
          <div className="flex items-center space-x-3 text-sm font-medium opacity-80 pointer-events-none">
            <div className="opacity-70">{window.icon}</div>
            <span className="tracking-wide">{window.title}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={(e) => { e.stopPropagation(); onMinimize(window.id); }}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white/60 hover:text-white"
            >
              <Minus size={16} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onClose(window.id); }}
              className="p-1.5 rounded-full hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden relative p-0 select-text cursor-auto">
             <div className="absolute inset-0 p-6 overflow-auto custom-scrollbar">
                {window.content}
             </div>
        </div>

        {/* Resize Handle */}
        <div 
            className="absolute bottom-0 right-0 w-8 h-8 cursor-se-resize flex items-center justify-center text-white/20 hover:text-white/50 transition-colors z-50"
            onPointerDown={handleResizeStart}
        >
           <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M11 1L11 11L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
        </div>
      </GlassPane>
    </div>
  );
};