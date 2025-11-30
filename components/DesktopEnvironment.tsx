import React, { useState, useEffect } from 'react';
import { Dock } from './Dock';
import { SpatialWindow } from './SpatialWindow';
import { WindowState, AppId, Position, Size, TourStep } from '../types';
import { BillSystem } from './apps/BillSystem';
import { SpatialGallery } from './apps/SpatialGallery';
import { WebBrowser } from './apps/WebBrowser';
import { Notes } from './apps/Notes';
import { Settings } from './apps/Settings';
import { FileManager } from './apps/FileManager';
import { Brain, Image, Monitor, StickyNote, Settings as SettingsIcon, Globe, Folder, HardDrive } from 'lucide-react';
import { GlassPane } from './ui/GlassPane';
import { TourOverlay } from './ui/TourOverlay';
import { ContextMenu } from './ui/ContextMenu';

const TOUR_STEPS: TourStep[] = [
  {
    target: 'center',
    title: "System Initialization",
    description: "Welcome to BILL Spatial OS. This is a full desktop environment with file management, web browsing, and spatial apps."
  },
  {
    target: 'dock',
    title: "Object Dock",
    description: "Launch your applications here. We've added a File Manager and a full Web Browser."
  },
  {
    target: 'center',
    title: "Desktop Interaction",
    description: "You can right-click on the wallpaper to access system context menus, or double-click icons to launch apps."
  }
];

const INITIAL_WINDOWS: WindowState[] = [
  {
    id: AppId.BILL_SYSTEM,
    title: "BILL Protocol",
    isOpen: true,
    isMinimized: false,
    zIndex: 10,
    position: { x: 80, y: 60 },
    size: { width: 500, height: 600 },
    content: <BillSystem />,
    icon: <Brain size={20} />
  },
  {
    id: AppId.WEB_BROWSER,
    title: "Spatial Web",
    isOpen: false,
    isMinimized: false,
    zIndex: 11,
    position: { x: 150, y: 80 },
    size: { width: 900, height: 650 },
    content: <WebBrowser />,
    icon: <Globe size={20} />
  },
  {
    id: AppId.FILE_MANAGER,
    title: "Files",
    isOpen: false,
    isMinimized: false,
    zIndex: 12,
    position: { x: 200, y: 120 },
    size: { width: 800, height: 500 },
    content: <FileManager />,
    icon: <Folder size={20} />
  },
  {
    id: AppId.SPATIAL_GALLERY,
    title: "Spatial Memories",
    isOpen: false,
    isMinimized: false,
    zIndex: 13,
    position: { x: 600, y: 150 },
    size: { width: 640, height: 480 },
    content: <SpatialGallery />,
    icon: <Image size={20} />
  },
  {
    id: AppId.NOTES,
    title: "Thoughts",
    isOpen: false,
    isMinimized: false,
    zIndex: 14,
    position: { x: 700, y: 100 },
    size: { width: 400, height: 500 },
    content: <Notes />,
    icon: <StickyNote size={20} />
  },
  {
      id: AppId.SYSTEM_MONITOR,
      title: "Shape Monitor",
      isOpen: false,
      isMinimized: false,
      zIndex: 15,
      position: { x: 900, y: 50 },
      size: { width: 320, height: 380 },
      content: (
          <div className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-white/5 flex items-center justify-center relative animate-pulse-slow">
                      <div className="absolute inset-0 border-t-4 border-r-4 border-purple-400/50 rounded-full animate-spin duration-[3000ms]"></div>
                      <div className="absolute inset-2 border-b-4 border-l-4 border-blue-400/30 rounded-full animate-reverse-spin duration-[5000ms]"></div>
                      <span className="text-3xl font-thin tracking-tighter">98<span className="text-sm">%</span></span>
                  </div>
              </div>
              <div className="text-center space-y-1">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/40 block">System Stability</span>
                  <span className="text-sm font-medium text-green-400">OPTIMAL</span>
              </div>
          </div>
      ),
      icon: <Monitor size={20} />
  },
  {
      id: AppId.SETTINGS,
      title: "Environment",
      isOpen: false,
      isMinimized: false,
      zIndex: 16,
      position: { x: 400, y: 200 },
      size: { width: 420, height: 550 },
      content: <Settings />,
      icon: <SettingsIcon size={20} />
  }
];

export const DesktopEnvironment = () => {
  const [windows, setWindows] = useState<WindowState[]>(INITIAL_WINDOWS);
  const [activeId, setActiveId] = useState<string | null>(AppId.BILL_SYSTEM);
  const [maxZ, setMaxZ] = useState(20);
  const [contextMenu, setContextMenu] = useState<{x: number, y: number} | null>(null);
  
  // Tour State
  const [tourStepIndex, setTourStepIndex] = useState<number>(-1);
  const isTourActive = tourStepIndex >= 0;

  useEffect(() => {
     const startTour = () => setTourStepIndex(0);
     setWindows(prev => prev.map(w => {
         if (w.id === AppId.BILL_SYSTEM) {
             return { ...w, content: <BillSystem onStartTour={startTour} /> }
         }
         return w;
     }));
     
     const hasToured = localStorage.getItem('bill_tour_complete');
     if (!hasToured) {
         setTimeout(() => setTourStepIndex(0), 1000);
     }

     const handleClickOutside = () => setContextMenu(null);
     document.addEventListener('click', handleClickOutside);
     return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleContextAction = (action: string) => {
      setContextMenu(null);
      if (action === 'settings') handleOpen(AppId.SETTINGS);
      if (action === 'new_folder') handleOpen(AppId.FILE_MANAGER); // Simplified: just open files for now
      if (action === 'display') alert("Display settings calibrated for Vision Pro");
  };

  const handleNextTourStep = () => {
      const nextStep = tourStepIndex + 1;
      if (nextStep >= TOUR_STEPS.length) {
          setTourStepIndex(-1);
          localStorage.setItem('bill_tour_complete', 'true');
      } else {
          setTourStepIndex(nextStep);
      }
  };

  const handleSkipTour = () => {
      setTourStepIndex(-1);
      localStorage.setItem('bill_tour_complete', 'true');
  };

  const handleFocus = (id: string) => {
    setActiveId(id);
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: maxZ + 1 } : w
    ));
    setMaxZ(prev => prev + 1);
  };

  const handleOpen = (id: string) => {
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        if (w.isOpen && !w.isMinimized) {
            handleFocus(id);
            return w;
        }
        return { ...w, isOpen: true, isMinimized: false, zIndex: maxZ + 1 };
      }
      return w;
    }));
    setMaxZ(prev => prev + 1);
    setActiveId(id);
  };

  const handleClose = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isOpen: false } : w
    ));
    if (activeId === id) setActiveId(null);
  };

  const handleMinimize = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
    if (activeId === id) setActiveId(null);
  };

  const handleMove = (id: string, pos: Position) => {
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
          const maxX = window.innerWidth - 50; 
          const maxY = window.innerHeight - 50;
          const minX = -w.size.width + 50;
          const minY = 0;
          return { 
              ...w, 
              position: {
                  x: Math.max(minX, Math.min(pos.x, maxX)),
                  y: Math.max(minY, Math.min(pos.y, maxY))
              } 
          };
      }
      return w;
    }));
  };

  const handleResize = (id: string, size: Size) => {
      setWindows(prev => prev.map(w => {
          if (w.id === id) {
              return { ...w, size };
          }
          return w;
      }));
  };

  const tourTargetWindow = windows.find(w => w.id === TOUR_STEPS[tourStepIndex]?.targetId);

  return (
    <div 
        className="relative w-full h-screen overflow-hidden text-white font-sans selection:bg-purple-500/30"
        onContextMenu={handleContextMenu}
    >
      
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 scale-105"
        style={{ 
            backgroundImage: `url('https://picsum.photos/id/202/1920/1080')`,
            filter: 'brightness(0.35) saturate(1.1) contrast(1.1)'
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

      {/* Desktop Icons */}
      <div className="absolute top-24 left-8 z-0 grid gap-8 pointer-events-auto">
          <DesktopIcon 
            label="Macintosh HD" 
            icon={<HardDrive size={32} className="text-gray-300" />} 
            onClick={() => handleOpen(AppId.FILE_MANAGER)} 
          />
          <DesktopIcon 
            label="Documents" 
            icon={<Folder size={32} className="text-blue-400" fill="currentColor" fillOpacity={0.2} />} 
            onClick={() => handleOpen(AppId.FILE_MANAGER)} 
          />
          <DesktopIcon 
            label="Protocol.pdf" 
            icon={<StickyNote size={32} className="text-white/80" />} 
            onClick={() => handleOpen(AppId.BILL_SYSTEM)} 
          />
      </div>

      {/* Context Menu */}
      {contextMenu && (
          <ContextMenu 
            x={contextMenu.x} 
            y={contextMenu.y} 
            onClose={() => setContextMenu(null)}
            onAction={handleContextAction}
          />
      )}

      {/* Tour Overlay */}
      {isTourActive && (
          <TourOverlay 
              step={TOUR_STEPS[tourStepIndex]}
              currentStepIndex={tourStepIndex}
              totalSteps={TOUR_STEPS.length}
              onNext={handleNextTourStep}
              onSkip={handleSkipTour}
              targetWindowPosition={tourTargetWindow?.position}
              targetWindowSize={tourTargetWindow?.size}
          />
      )}

      {/* Spatial Container */}
      <div className="relative z-10 w-full h-full perspective-1000 pointer-events-none">
        {windows.map(window => (
          <div key={window.id} className="pointer-events-auto">
              <SpatialWindow 
                window={window}
                onClose={handleClose}
                onMinimize={handleMinimize}
                onFocus={handleFocus}
                onMove={handleMove}
                onResize={handleResize}
              />
          </div>
        ))}
      </div>

      {/* Dock */}
      <Dock 
        windows={windows} 
        activeId={activeId} 
        onAppClick={(id) => handleOpen(id)} 
      />

      {/* Top Status Bar */}
      <div className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-start pointer-events-none">
         <div className="pointer-events-auto">
             <GlassPane className="px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 hover:bg-white/10 cursor-pointer transition-colors">
                 <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                 <span>BILL Protocol Active</span>
             </GlassPane>
         </div>
         <div className="pointer-events-auto flex gap-2">
            <GlassPane className="px-4 py-2 rounded-full text-xs font-medium hover:bg-white/10 cursor-pointer transition-colors">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </GlassPane>
         </div>
      </div>
    </div>
  );
};

const DesktopIcon = ({ label, icon, onClick }: { label: string, icon: React.ReactNode, onClick: () => void }) => (
    <div 
        className="flex flex-col items-center gap-2 group cursor-pointer w-24"
        onDoubleClick={onClick}
    >
        <div className="p-3 rounded-xl bg-white/5 border border-transparent group-hover:bg-white/10 group-hover:border-white/10 transition-all shadow-sm">
            {icon}
        </div>
        <span className="text-xs font-medium text-white/80 drop-shadow-md text-center bg-black/20 rounded px-2 py-0.5 group-hover:bg-blue-500/50 transition-colors">
            {label}
        </span>
    </div>
);