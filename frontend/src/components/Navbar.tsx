"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  Layers, 
  Cpu, 
  MessageSquare, 
  Command,
  Activity
} from 'lucide-react';

// --- Sub-component for individual links to handle local mouse tracking ---
const SideNavLink = ({ link }: { link: any }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!linkRef.current) return;
    const rect = linkRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <a 
      ref={linkRef}
      onMouseMove={handleMouseMove}
      href={link.h} 
      className="group relative flex flex-col items-center py-2"
    >
      {/* Radial Glow - Matches Project Card Logic */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-0"
        style={{
          background: `radial-gradient(60px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.15), transparent 80%)`,
        }}
      />

      <div className="relative z-10 p-3 rounded-2xl text-slate-500 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-all duration-300 border border-transparent group-hover:border-blue-500/20">
        <link.i size={20} />
      </div>
      
      {/* Cinematic Tooltip */}
      <div className="absolute left-full ml-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-2 group-hover:translate-x-0 z-50">
        <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl shadow-2xl">
          <span className="text-[10px] font-bold text-blue-400 tracking-[0.2em] uppercase whitespace-nowrap">
            {link.n}
          </span>
        </div>
      </div>
    </a>
  );
};

// --- Main SideNav Component ---
const SideNav = ({ isVisible = true }: { isVisible?: boolean } = {}) => {
  const [time, setTime] = useState("");
  
  const links = [
    { n: 'System', h: '#home', i: Home },
    { n: 'Projects', h: '#work', i: Layers },
    { n: 'Specs', h: '#services', i: Cpu },
    { n: 'Auth', h: '#contact', i: MessageSquare },
  ];

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString([], { hour12: false }));
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className={`fixed left-0 top-0 h-full w-20 md:w-24 bg-slate-900/60 backdrop-blur-xl border-r border-slate-800/50 z-[100] flex flex-col items-center py-10 transition-all duration-[1200ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] overflow-hidden ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
      
      {/* Background Focus Glow */}
      <div className={`absolute inset-0 bg-blue-600/[0.03] transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />

      {/* Vertical Light Sweep Animation */}
      <div className={`absolute -inset-y-full w-full bg-gradient-to-b from-transparent via-white/5 to-transparent -skew-y-12 transition-all duration-[2000ms] ease-in-out pointer-events-none ${isVisible ? 'translate-y-[200%]' : '-translate-y-full'}`} />

      {/* Logo Section */}
      <div className="mb-16 relative group z-10">
        <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative w-12 h-12 border border-blue-500/20 rounded-2xl flex items-center justify-center bg-blue-500/5 cursor-pointer transition-all duration-500 group-hover:border-blue-400/40 shadow-2xl shadow-blue-500/10">
          <Command size={22} className="text-blue-400 group-hover:rotate-90 transition-transform duration-700" />
        </div>
      </div>

      {/* Navigation Links Grid */}
      <div className="flex-1 flex flex-col gap-8 z-10 w-full px-4">
        {links.map((link) => (
          <SideNavLink key={link.n} link={link} />
        ))}
      </div>

      {/* Status Bar & Vertical Clock */}
      <div className="mt-auto flex flex-col items-center gap-12 pt-10 border-t border-slate-800/50 z-10 w-full">
        <div className="flex flex-col items-center gap-3">
           <Activity size={14} className="text-blue-500/40 animate-pulse" />
           <span className="text-[8px] text-slate-500 font-bold uppercase tracking-[0.4em] [writing-mode:vertical-lr] rotate-180">
            Node_Online
          </span>
        </div>
        <span className="text-[10px] text-slate-600 tabular-nums font-medium tracking-widest [writing-mode:vertical-lr] rotate-180 mb-4">
          {time || "00:00:00"}
        </span>
      </div>
    </nav>
  );
};

export default SideNav;