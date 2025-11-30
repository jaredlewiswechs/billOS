import React, { useState } from 'react';
import { Folder, FileText, Image as ImageIcon, HardDrive, ChevronRight, Search, LayoutGrid, List as ListIcon, Globe } from 'lucide-react';
import { FileItem } from '../../types';

const INITIAL_FILES: FileItem[] = [
    { id: '1', name: 'Project_Alpha', type: 'folder', date: 'Today, 10:23 AM' },
    { id: '2', name: 'Budget_2024.pdf', type: 'doc', size: '2.4 MB', date: 'Yesterday' },
    { id: '3', name: 'Design_Mockup.png', type: 'image', size: '12 MB', date: 'Oct 24' },
    { id: '4', name: 'Notes.txt', type: 'file', size: '4 KB', date: 'Oct 22' },
    { id: '5', name: 'Meeting_Recording.mp3', type: 'file', size: '45 MB', date: 'Oct 20' },
    { id: '6', name: 'Presentation', type: 'folder', date: 'Oct 15' },
];

export const FileManager = () => {
  const [currentPath, setCurrentPath] = useState(['Home']);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const getIcon = (type: string) => {
      switch(type) {
          case 'folder': return <Folder className="text-blue-400" size={40} fill="currentColor" fillOpacity={0.2} />;
          case 'image': return <ImageIcon className="text-purple-400" size={40} />;
          case 'doc': return <FileText className="text-white/70" size={40} />;
          default: return <FileText className="text-white/50" size={40} />;
      }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Sidebar + Main Content Layout */}
      <div className="flex-1 flex overflow-hidden">
          
          {/* Sidebar */}
          <div className="w-48 bg-white/5 border-r border-white/5 p-4 flex flex-col gap-6">
              <div>
                  <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 px-2">Locations</h3>
                  <div className="space-y-1">
                      <SidebarItem icon={<HardDrive size={16} />} label="Macintosh HD" active />
                      <SidebarItem icon={<HardDrive size={16} />} label="External Drive" />
                      <SidebarItem icon={<Globe size={16} />} label="Network" />
                  </div>
              </div>
              <div>
                  <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 px-2">Favorites</h3>
                  <div className="space-y-1">
                      <SidebarItem icon={<Folder size={16} />} label="Desktop" />
                      <SidebarItem icon={<FileText size={16} />} label="Documents" />
                      <SidebarItem icon={<ImageIcon size={16} />} label="Pictures" />
                      <SidebarItem icon={<Folder size={16} />} label="Downloads" />
                  </div>
              </div>
          </div>

          {/* Main Area */}
          <div className="flex-1 flex flex-col">
              {/* Toolbar */}
              <div className="h-12 border-b border-white/5 flex items-center justify-between px-4">
                  <div className="flex items-center gap-2 text-sm text-white/60">
                      <span className="hover:text-white cursor-pointer transition-colors">Home</span>
                      <ChevronRight size={14} />
                      <span className="text-white font-medium">Documents</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                      <div className="bg-black/20 rounded-md p-1 flex">
                          <button 
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}`}
                          >
                              <LayoutGrid size={14} />
                          </button>
                          <button 
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}`}
                          >
                              <ListIcon size={14} />
                          </button>
                      </div>
                      <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70">
                          <Search size={16} />
                      </button>
                  </div>
              </div>

              {/* File Grid */}
              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                  <div className={`
                    ${viewMode === 'grid' ? 'grid grid-cols-4 gap-4' : 'flex flex-col gap-1'}
                  `}>
                      {INITIAL_FILES.map(file => (
                          <div 
                            key={file.id}
                            onClick={() => setSelectedId(file.id)}
                            className={`
                                group cursor-pointer rounded-xl transition-all duration-200 border border-transparent
                                ${viewMode === 'grid' ? 'flex flex-col items-center p-4 gap-3 hover:bg-white/5' : 'flex items-center p-2 gap-4 hover:bg-white/5 px-4'}
                                ${selectedId === file.id ? 'bg-blue-500/20 border-blue-500/30' : ''}
                            `}
                          >
                              <div className="relative group-hover:scale-105 transition-transform duration-300">
                                  {getIcon(file.type)}
                              </div>
                              <div className={`${viewMode === 'grid' ? 'text-center' : 'flex-1 flex justify-between items-center'}`}>
                                  <span className="text-sm text-white/90 truncate max-w-[120px] block">{file.name}</span>
                                  {viewMode === 'list' && (
                                      <div className="flex gap-8 text-xs text-white/40">
                                          <span className="w-24">{file.date}</span>
                                          <span className="w-16 text-right">{file.size || '--'}</span>
                                      </div>
                                  )}
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
    <div className={`flex items-center gap-3 px-2 py-1.5 rounded-lg cursor-pointer transition-colors ${active ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
        {icon}
        <span className="text-sm">{label}</span>
    </div>
);