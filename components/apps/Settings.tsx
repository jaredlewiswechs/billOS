import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, Wifi, Bluetooth, Eye, Volume2, Shield, Battery } from 'lucide-react';

const ToggleItem = ({ label, icon, initial = false }: { label: string, icon: React.ReactNode, initial?: boolean }) => {
    const [active, setActive] = useState(initial);
    return (
        <div 
            className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            onClick={() => setActive(!active)}
        >
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${active ? 'bg-purple-500/20 text-purple-300' : 'bg-white/5 text-white/50'}`}>
                    {icon}
                </div>
                <span className="text-sm font-medium text-white/90">{label}</span>
            </div>
            {active 
                ? <ToggleRight className="text-purple-400" size={28} /> 
                : <ToggleLeft className="text-white/30" size={28} />
            }
        </div>
    );
};

export const Settings = () => {
  return (
    <div className="h-full flex flex-col space-y-6 overflow-y-auto pr-2 custom-scrollbar">
      <div>
          <h2 className="text-xl font-light mb-1">Environment</h2>
          <p className="text-xs text-white/50 mb-4">Configure your spatial computing context.</p>
          
          <div className="space-y-3">
              <ToggleItem label="Passthrough Mode" icon={<Eye size={18} />} initial={true} />
              <ToggleItem label="Spatial Audio" icon={<Volume2 size={18} />} initial={true} />
              <ToggleItem label="Hand Tracking" icon={<Shield size={18} />} initial={true} />
          </div>
      </div>

      <div>
          <h2 className="text-xl font-light mb-1">Connectivity</h2>
          <p className="text-xs text-white/50 mb-4">Network and peripherals.</p>
          
          <div className="space-y-3">
              <ToggleItem label="Wi-Fi" icon={<Wifi size={18} />} initial={true} />
              <ToggleItem label="Bluetooth" icon={<Bluetooth size={18} />} initial={false} />
          </div>
      </div>

      <div className="bg-white/5 rounded-2xl p-4 mt-auto border border-white/5">
          <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium uppercase tracking-wider text-white/60">Power</span>
              <Battery size={16} className="text-green-400" />
          </div>
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-[85%]"></div>
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-white/40">
              <span>High Performance</span>
              <span>4h 32m remaining</span>
          </div>
      </div>
    </div>
  );
};