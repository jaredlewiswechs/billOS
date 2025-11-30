import React from 'react';
import { RefreshCw, FolderPlus, Image, Settings, Monitor } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onAction: (action: string) => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose, onAction }) => {
  return (
    <div 
        className="fixed z-[100] w-48 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-1 animate-in fade-in zoom-in-95 duration-100"
        style={{ top: y, left: x }}
        onClick={(e) => e.stopPropagation()}
    >
        <MenuItem icon={<FolderPlus size={14} />} label="New Folder" onClick={() => onAction('new_folder')} />
        <MenuItem icon={<RefreshCw size={14} />} label="Refresh Environment" onClick={() => onAction('refresh')} />
        <div className="h-[1px] bg-white/10 my-1 mx-2"></div>
        <MenuItem icon={<Image size={14} />} label="Change Wallpaper" onClick={() => onAction('wallpaper')} />
        <MenuItem icon={<Monitor size={14} />} label="Display Settings" onClick={() => onAction('display')} />
        <div className="h-[1px] bg-white/10 my-1 mx-2"></div>
        <MenuItem icon={<Settings size={14} />} label="System Preferences..." onClick={() => onAction('settings')} />
    </div>
  );
};

const MenuItem = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) => (
    <button 
        className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-blue-500/50 hover:text-white text-white/80 transition-colors text-xs"
        onClick={onClick}
    >
        {icon}
        <span>{label}</span>
    </button>
);