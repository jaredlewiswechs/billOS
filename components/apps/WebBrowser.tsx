import React, { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Lock, Globe, ExternalLink, Home } from 'lucide-react';

export const WebBrowser = () => {
  const [url, setUrl] = useState('https://en.wikipedia.org/wiki/Spatial_computing');
  const [inputUrl, setInputUrl] = useState('https://en.wikipedia.org/wiki/Spatial_computing');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>(['https://en.wikipedia.org/wiki/Spatial_computing']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const navigate = (newUrl: string) => {
    let target = newUrl;
    if (!target.startsWith('http')) {
        if (target.includes('.') && !target.includes(' ')) {
             target = 'https://' + target;
        } else {
            // Search fallback (Wikipedia search is iframe friendly-ish)
            target = `https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(target)}`;
        }
    }
    
    setIsLoading(true);
    setUrl(target);
    setInputUrl(target);
    
    // Update history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(target);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(inputUrl);
  };

  const goBack = () => {
      if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setUrl(history[newIndex]);
          setInputUrl(history[newIndex]);
          setIsLoading(true);
      }
  };

  const goForward = () => {
      if (historyIndex < history.length - 1) {
          const newIndex = historyIndex + 1;
          setHistoryIndex(newIndex);
          setUrl(history[newIndex]);
          setInputUrl(history[newIndex]);
          setIsLoading(true);
      }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    const current = url;
    setUrl('about:blank');
    setTimeout(() => {
        setUrl(current);
    }, 100);
  };

  const openExternal = () => {
      window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="h-full flex flex-col w-full">
      {/* Browser Toolbar */}
      <div className="flex items-center gap-2 p-3 bg-white/5 border-b border-white/10 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-1">
            <button 
                onClick={goBack} 
                disabled={historyIndex === 0}
                className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
            >
                <ArrowLeft size={16} />
            </button>
            <button 
                onClick={goForward}
                disabled={historyIndex === history.length - 1}
                className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
            >
                <ArrowRight size={16} />
            </button>
            <button 
                onClick={handleRefresh}
                className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
                <RotateCw size={16} className={isLoading ? 'animate-spin' : ''} />
            </button>
            <button 
                onClick={() => navigate('https://en.wikipedia.org/wiki/Main_Page')}
                className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
                <Home size={16} />
            </button>
        </div>

        {/* Address Bar */}
        <form onSubmit={handleSubmit} className="flex-1">
            <div className="relative group w-full">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-white/40 group-focus-within:text-purple-400 transition-colors">
                    {url.startsWith('https') ? <Lock size={12} /> : <Globe size={12} />}
                </div>
                <input
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    className="w-full bg-black/20 hover:bg-black/30 border border-white/5 rounded-lg py-1.5 pl-9 pr-4 text-xs text-white/90 focus:outline-none focus:bg-black/40 focus:ring-1 focus:ring-purple-500/50 transition-all font-mono shadow-inner"
                    placeholder="Enter URL..."
                />
            </div>
        </form>

        <button 
            onClick={openExternal}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            title="Open in real browser (Fixes display issues)"
        >
            <ExternalLink size={16} />
        </button>
      </div>

      {/* Browser Content */}
      <div className="flex-1 relative bg-white w-full overflow-hidden rounded-b-[2rem]">
        {isLoading && (
            <div className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 z-10 animate-shimmer w-full"></div>
        )}
        
        <iframe 
            ref={iframeRef}
            src={url}
            className="w-full h-full border-none bg-white"
            title="Browser Content"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            onLoad={() => setIsLoading(false)}
        />
        
        {/* Security / Embed Warning Overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md text-white/70 text-[10px] px-3 py-1 rounded-full pointer-events-none border border-white/10">
            Simulated Environment • Some sites may block embedding
        </div>
      </div>
    </div>
  );
};