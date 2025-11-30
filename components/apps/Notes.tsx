import React, { useState, useEffect } from 'react';
import { Save, Trash2 } from 'lucide-react';

export const Notes = () => {
  const [content, setContent] = useState('');
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('bill_notes_content');
    if (saved) setContent(saved);
  }, []);

  const handleSave = () => {
    localStorage.setItem('bill_notes_content', content);
    const now = new Date().toLocaleTimeString();
    setLastSaved(`Saved at ${now}`);
    setTimeout(() => setLastSaved(null), 2000);
  };

  const handleClear = () => {
    if (window.confirm('Clear all notes?')) {
        setContent('');
        localStorage.removeItem('bill_notes_content');
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2 shrink-0">
          <span className="text-xs font-medium text-white/50 uppercase tracking-widest">Scratchpad</span>
          <div className="flex gap-1">
              <button onClick={handleSave} className="p-1.5 hover:bg-white/10 rounded-md text-white/70 hover:text-white transition-colors" title="Save">
                  <Save size={14} />
              </button>
              <button onClick={handleClear} className="p-1.5 hover:bg-white/10 rounded-md text-white/70 hover:text-red-400 transition-colors" title="Clear">
                  <Trash2 size={14} />
              </button>
          </div>
      </div>
      
      <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 bg-black/20 rounded-xl p-4 resize-none focus:outline-none focus:ring-1 focus:ring-white/20 text-sm leading-relaxed placeholder-white/30 text-white/90 font-light border border-white/5 shadow-inner"
          placeholder="Type to structure your thoughts..."
      />
      
      <div className="h-6 flex items-center justify-end mt-1 shrink-0">
          {lastSaved && <span className="text-[10px] text-green-400 animate-in fade-in duration-300">{lastSaved}</span>}
      </div>
    </div>
  );
};