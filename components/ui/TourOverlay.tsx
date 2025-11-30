import React from 'react';
import { GlassPane } from './GlassPane';
import { ChevronRight, X } from 'lucide-react';
import { TourStep, Position, Size } from '../../types';

interface TourOverlayProps {
  step: TourStep;
  currentStepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onSkip: () => void;
  targetWindowPosition?: Position;
  targetWindowSize?: Size;
}

export const TourOverlay: React.FC<TourOverlayProps> = ({ 
  step, 
  currentStepIndex, 
  totalSteps, 
  onNext, 
  onSkip,
  targetWindowPosition,
  targetWindowSize
}) => {
  
  // Calculate position of the tooltip based on the target
  const getStyle = (): React.CSSProperties => {
    switch (step.target) {
      case 'dock':
        return { bottom: '120px', left: '50%', transform: 'translateX(-50%)' };
      case 'status':
        return { top: '80px', left: '20px' };
      case 'window':
        if (targetWindowPosition && targetWindowSize) {
            return {
                top: targetWindowPosition.y + targetWindowSize.height / 2,
                left: targetWindowPosition.x + targetWindowSize.width + 20,
            };
        }
        return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
      case 'center':
      default:
        return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }
  };

  return (
    <div className="fixed inset-0 z-[100] pointer-events-auto">
      {/* Dimmed Background */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500" onClick={onSkip} />
      
      {/* Spotlight Effect (simplified via layout placement) */}
      
      {/* Tour Card */}
      <div 
        className="absolute transition-all duration-500 ease-in-out"
        style={getStyle()}
      >
        <GlassPane className="w-80 p-6 rounded-3xl animate-in zoom-in-95 fade-in slide-in-from-bottom-4 duration-500 border border-white/20 shadow-2xl">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span className="text-xs font-semibold tracking-wider uppercase text-purple-200">BILL Guide</span>
            </div>
            <button onClick={onSkip} className="text-white/40 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>
          
          <h3 className="text-xl font-medium mb-2">{step.title}</h3>
          <p className="text-white/70 text-sm leading-relaxed mb-6">
            {step.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/30 font-mono">
              STEP {currentStepIndex + 1}/{totalSteps}
            </span>
            <button 
              onClick={onNext}
              className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all hover:scale-105 active:scale-95"
            >
              <span>{currentStepIndex === totalSteps - 1 ? 'Initialize' : 'Next'}</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </GlassPane>

        {/* Pointer Line (Visual Flourish) */}
        {step.target === 'window' && (
            <div className="absolute top-1/2 -left-20 w-20 h-[1px] bg-gradient-to-r from-transparent to-white/50" />
        )}
      </div>
    </div>
  );
};