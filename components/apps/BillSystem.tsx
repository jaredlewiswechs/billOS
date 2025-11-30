import React from 'react';
import { BrainCircuit, Info, CheckCircle2, AlertTriangle, CloudFog, RefreshCw } from 'lucide-react';
import { ShapeVector } from '../../types';

const ShapeVisualizer: React.FC<{ vector: ShapeVector }> = ({ vector }) => {
  return (
    <div className="bg-black/20 rounded-xl p-4 mb-6 border border-white/10">
      <h3 className="text-xs uppercase tracking-wider text-white/50 mb-3 font-semibold">Shape Vector S = (c, m, f, k)</h3>
      <div className="grid grid-cols-2 gap-4">
        <Metric label="Correctness (c)" value={vector.c} icon={<CheckCircle2 size={14} className="text-green-400" />} />
        <Metric label="Misconception (m)" value={vector.m} icon={<AlertTriangle size={14} className="text-red-400" />} />
        <Metric label="Fog (f)" value={vector.f} icon={<CloudFog size={14} className="text-blue-200" />} />
        <Metric label="Confidence (k)" value={vector.k} icon={<BrainCircuit size={14} className="text-purple-400" />} />
      </div>
    </div>
  );
};

const Metric: React.FC<{ label: string, value: number, icon: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="flex flex-col space-y-1">
    <div className="flex items-center space-x-2 text-xs text-white/70">
      {icon}
      <span>{label}</span>
    </div>
    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
      <div 
        className="h-full bg-white/80 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${value * 100}%` }}
      />
    </div>
  </div>
);

interface BillSystemProps {
    onStartTour?: () => void;
}

export const BillSystem: React.FC<BillSystemProps> = ({ onStartTour }) => {
  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="space-y-2 flex justify-between items-start">
        <div>
            <h1 className="text-3xl font-light tracking-tight">BILL System</h1>
            <p className="text-lg text-white/60 font-light">
            Protocol v1.0 • Shape Engine Online
            </p>
        </div>
        {onStartTour && (
            <button 
                onClick={onStartTour}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                title="Restart System Tour"
            >
                <RefreshCw size={18} />
            </button>
        )}
      </div>

      <ShapeVisualizer vector={{ c: 0.95, m: 0.05, f: 0.1, k: 0.9 }} />

      <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <h4 className="font-medium mb-2 flex items-center gap-2">
                <Info size={16} />
                <span>System Status</span>
            </h4>
            <p className="text-sm text-white/70 leading-relaxed">
                The desktop environment is functioning within normal parameters. 
                Visual harmony is established through deferential materials (Glass). 
                Spatial depth is active.
            </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
             <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                <h5 className="text-sm font-medium mb-1 group-hover:text-white">Protocol</h5>
                <p className="text-xs text-white/50">Parsing inputs into shape vectors to ensure clarity.</p>
             </div>
             <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                <h5 className="text-sm font-medium mb-1 group-hover:text-white">Architecture</h5>
                <p className="text-xs text-white/50">React + TS + Tailwind. Object-oriented window management.</p>
             </div>
        </div>
      </div>
    </div>
  );
};