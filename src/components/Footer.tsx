import React from 'react';
import { Terminal } from 'lucide-react';

export function Footer() {
  const handleTerminalClick = (e: React.MouseEvent, command?: string) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-terminal', { detail: { command } }));
  };

  return (
    <footer className="bg-surface w-full border-t border-outline-variant/15">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 py-12 w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="text-on-surface font-bold font-headline uppercase tracking-tighter text-xl">Neural Architect</div>
          <p className="font-['Space_Grotesk'] text-[10px] text-primary-container tracking-[0.1em] uppercase">© 2024 Neural Architect. Built with Precision.</p>
          <div className="flex flex-col items-center md:items-start gap-1 mt-2">
            <a href="mailto:edricjsam@gmail.com" className="font-['Space_Grotesk'] text-xs text-on-surface-variant hover:text-primary transition-colors tracking-widest">edricjsam@gmail.com</a>
            <a href="tel:+917305528953" className="font-['Space_Grotesk'] text-xs text-on-surface-variant hover:text-primary transition-colors tracking-widest">+91 7305528953</a>
          </div>
        </div>
        <div className="flex gap-10 my-8 md:my-0">
          <button 
            className="font-['Space_Grotesk'] text-[10px] text-on-surface hover:text-primary hover:translate-x-2 transition-all duration-500 tracking-widest uppercase cursor-pointer bg-transparent border-none p-0 outline-none" 
            onClick={(e) => handleTerminalClick(e, 'privacy')}
          >
            Privacy Policy
          </button>
          <button 
            className="font-['Space_Grotesk'] text-[10px] text-on-surface hover:text-primary hover:translate-x-2 transition-all duration-500 tracking-widest uppercase cursor-pointer bg-transparent border-none p-0 outline-none" 
            onClick={(e) => handleTerminalClick(e)}
          >
            Terminal Access
          </button>
          <a 
            className="font-['Space_Grotesk'] text-[10px] text-on-surface hover:text-primary hover:translate-x-2 transition-all duration-500 tracking-widest uppercase" 
            href="#"
          >
            Source Code
          </a>
        </div>
        <div className="flex items-center gap-4 text-outline">
          <Terminal className="w-4 h-4" />
          <span className="font-['Inter'] text-[10px] font-mono tracking-widest uppercase text-on-surface">v2.0.4 stable_build</span>
        </div>
      </div>
    </footer>
  );
}
