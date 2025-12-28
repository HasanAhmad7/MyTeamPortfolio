"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  Home,
  Layers,
  Cpu,
  MessageSquare,
  Zap,
  Circle
} from 'lucide-react';

// --- Sub-component for individual links ---
const SideNavLink = ({ link, isActive }: { link: any; isActive: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={link.h}
      className="group relative flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Active Indicator Dot */}
      <div className={`absolute -left-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-b from-blue-400 to-cyan-400 transition-all duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />

      {/* Icon Container */}
      <div className={`relative p-3 rounded-2xl transition-all duration-500 ${isActive
          ? 'bg-gradient-to-br from-blue-500/30 to-cyan-500/20 text-blue-300 shadow-lg shadow-blue-500/30'
          : 'text-slate-400 hover:bg-slate-700/50 hover:text-blue-300'
        }`}>
        <link.i size={20} strokeWidth={isActive ? 2 : 1.5} />
      </div>

      {/* Premium Tooltip */}
      <div className={`absolute left-full ml-5 transition-all duration-300 pointer-events-none z-50 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
        <div className="relative">
          {/* Tooltip Arrow */}
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-px">
            <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-r-[6px] border-transparent border-r-slate-800/95" />
          </div>

          {/* Tooltip Content */}
          <div className="bg-slate-800/95 backdrop-blur-xl border border-slate-600/40 px-4 py-2 rounded-xl shadow-2xl">
            <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 tracking-wider uppercase whitespace-nowrap">
              {link.n}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

// --- Main SideNav Component ---
const SideNav = ({ isVisible = true }: { isVisible?: boolean } = {}) => {
  const [time, setTime] = useState("");
  const [activeSection, setActiveSection] = useState("System");

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
    <nav className={`fixed left-4 md:left-6 top-1/2 -translate-y-1/2 w-16 md:w-[72px] bg-gradient-to-b from-slate-900/90 via-slate-950/90 to-black/90 backdrop-blur-2xl rounded-full border border-slate-700/40 z-[100] flex flex-col items-center py-6 transition-all duration-[1200ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] shadow-2xl shadow-black/60 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>

      {/* Inner Glow */}
      <div className="absolute inset-[1px] bg-gradient-to-b from-blue-500/5 via-transparent to-cyan-500/5 rounded-full pointer-events-none" />

      {/* Ambient Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full h-1/3 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none" />

      {/* Logo Section */}
      <div className="mb-8 relative group z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700" />

        {/* Logo Container */}
        <div className="relative w-11 h-11 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-400/30 cursor-pointer transition-all duration-700 group-hover:border-blue-400/60 group-hover:scale-110 group-hover:rotate-12 shadow-lg shadow-blue-500/25">
          <Zap size={22} className="text-blue-400 group-hover:text-cyan-300 transition-all duration-700" strokeWidth={2.5} />
        </div>
      </div>

      {/* Divider */}
      <div className="w-8 h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent mb-6" />

      {/* Navigation Links */}
      <div className="flex-1 flex flex-col gap-3 z-10 items-center justify-center">
        {links.map((link) => (
          <SideNavLink
            key={link.n}
            link={link}
            isActive={activeSection === link.n}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="w-8 h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent mt-6 mb-6" />

      {/* Bottom Section */}
      <div className="flex flex-col items-center gap-5 z-10">
        {/* Status Indicator */}
        <div className="relative group">
          <Circle size={8} className="text-emerald-400 fill-emerald-400 animate-pulse" />
          <div className="absolute inset-0 bg-emerald-400/60 blur-md rounded-full animate-pulse" />

          {/* Status Tooltip */}
          <div className="absolute left-full ml-5 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
            <div className="bg-slate-800/95 backdrop-blur-xl border border-slate-600/40 px-3 py-1.5 rounded-lg shadow-xl">
              <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase">Online</span>
            </div>
          </div>
        </div>

        {/* Digital Clock */}
        <div className="relative group cursor-default">
          <div className="absolute inset-0 bg-blue-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
          <span className="relative text-[9px] text-transparent bg-clip-text bg-gradient-to-b from-slate-300 to-slate-500 tabular-nums font-bold tracking-tight [writing-mode:vertical-lr] rotate-180">
            {time || "00:00"}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default SideNav;