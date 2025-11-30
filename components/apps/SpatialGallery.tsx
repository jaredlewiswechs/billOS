import React from 'react';

const images = [
  "https://picsum.photos/id/16/400/300",
  "https://picsum.photos/id/28/400/300",
  "https://picsum.photos/id/42/400/300",
  "https://picsum.photos/id/56/400/300",
];

export const SpatialGallery = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-xl font-light">Memory Objects</h2>
        <p className="text-sm text-white/50">Visual data stored in spatial containers.</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 overflow-y-auto pb-4">
        {images.map((src, i) => (
          <div key={i} className="group relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-glass-hover">
             <img src={src} alt={`Gallery ${i}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-xs font-medium">Object_REF_{i + 10}</span>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};