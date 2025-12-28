"use client";
import React, { useState, useRef } from 'react';
import { 
  Cpu, 
  Mail, 
  Github, 
  Twitter, 
  Linkedin 
} from 'lucide-react';

const Footer = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const footerRef = useRef<HTMLDivElement>(null);

  // Staggered delays to ensure zero overlap in the orbit
  const languages = [
    { name: 'TypeScript', delay: '0s' },
    { name: 'React', delay: '-3s' },
    { name: 'Python', delay: '-6s' },
    { name: 'Rust', delay: '-9s' },
    { name: 'JavaScript', delay: '-12s' },
    { name: 'Go', delay: '-15s' },
    { name: 'C++', delay: '-18s' },
    { name: 'Kotlin', delay: '-21s' }
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = footerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    // Calculate normalized mouse position relative to the footer center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setMousePos({ 
      x: (e.clientX - centerX) / (rect.width / 2), 
      y: (e.clientY - centerY) / (rect.height / 2) 
    });
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 1200);
  };

  const eyeX = mousePos.x * 5;
  const eyeY = mousePos.y * 3;

  return (
    <footer 
      ref={footerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full mt-20"
    >
      {/* 1. ORBIT ANIMATION STYLES */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes horizontalSemicircleOrbit {
          0% { transform: translate3d(-500px, 150px, -200px) scale(0.6); opacity: 0; filter: blur(12px); }
          15% { opacity: 0.8; filter: blur(2px); transform: translate3d(-350px, 60px, -50px) scale(0.8); }
          40% { opacity: 1; filter: blur(0px); transform: translate3d(-150px, -120px, 100px) scale(1); }
          50% { transform: translate3d(0, -180px, 200px) scale(1.1); opacity: 1; }
          60% { opacity: 1; filter: blur(0px); transform: translate3d(150px, -120px, 100px) scale(1); }
          85% { opacity: 0.8; filter: blur(2px); transform: translate3d(350px, 60px, -50px) scale(0.8); }
          100% { transform: translate3d(500px, 150px, -200px) scale(0.6); opacity: 0; filter: blur(12px); }
        }
        .animate-orbit-horizontal { animation: horizontalSemicircleOrbit 24s ease-in-out infinite; }
      `}} />

      {/* 2. GLOW BACKDROP */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full transition-opacity duration-1000" 
          style={{ opacity: isHovered ? 1 : 0.4 }}
        />
      </div>

      {/* 3. INTERACTIVE DEVELOPER SVG SECTION */}
      <div className="relative z-10 flex justify-center -mb-20 md:-mb-32 px-4">
        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
          className="relative group cursor-crosshair transition-all duration-300 ease-out"
          style={{ 
            transform: `perspective(1000px) rotateX(${-mousePos.y * 5}deg) rotateY(${mousePos.x * 10}deg) translateZ(50px)`,
          }}
        >
          {/* Blue Aura Glow */}
          <div className={`absolute -inset-20 bg-blue-500/20 blur-[100px] rounded-full transition-all duration-700 ${isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-90'}`} />
          
          <div className="relative w-80 h-80 md:w-[500px] md:h-[500px] flex items-center justify-center">
            <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-[0_0_50px_rgba(59,130,246,0.2)] relative z-20">
              <rect x="50" y="420" width="400" height="15" rx="4" fill="#0f172a" />
              <rect x="40" y="435" width="420" height="5" rx="2" fill="#1e293b" />
              
              <g transform="translate(380, 360)">
                <path d="M0 0 L30 0 L25 40 L5 40 Z" fill="#e2e8f0" />
                <path d="M30 10 Q40 10 40 20 Q40 30 30 30" fill="none" stroke="#e2e8f0" strokeWidth="4" />
              </g>

              <path d="M180 420 Q180 280 250 280 Q320 280 320 420" fill="#1e293b" />
              <path d="M200 420 L300 420 L280 320 L220 320 Z" fill="#334155" />
              
              <g transform={`translate(${mousePos.x * 5}, ${mousePos.y * 3})`}>
                <circle cx="250" cy="240" r="45" fill="#f1f5f9" />
                <g transform={`translate(${eyeX}, ${eyeY})`}>
                  <circle cx="230" cy="240" r="4" fill="#0f172a" />
                  <circle cx="270" cy="240" r="4" fill="#0f172a" />
                </g>
                <g>
                  <rect x="218" y="234" width="28" height="15" rx="3" stroke="#0f172a" fill="none" strokeWidth="1.5" />
                  <rect x="254" y="234" width="28" height="15" rx="3" stroke="#0f172a" fill="none" strokeWidth="1.5" />
                  <path d="M246 241 L254 241" stroke="#0f172a" strokeWidth="1.5" />
                </g>
                <g transform="translate(0, -5)">
                  <path d="M205 240 A45 45 0 0 1 295 240" fill="none" stroke="#0f172a" strokeWidth="8" />
                  <rect x="192" y="230" width="16" height="34" rx="6" fill="#0f172a" />
                  <rect x="292" y="230" width="16" height="34" rx="6" fill="#0f172a" />
                </g>
              </g>

              <g transform="translate(160, 390)">
                <rect x="0" y="0" width="180" height="25" rx="4" fill="#0f172a" />
                {isHovered && Array.from({ length: 8 }).map((_, i) => (
                  <rect key={i} x={10 + i * 20} y="8" width="12" height="8" rx="2" fill="#3b82f6" className="animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </g>

              <g transform="translate(150, 300)">
                <rect x="10" y="0" width="180" height="110" rx="6" fill="#0f172a" stroke="#475569" strokeWidth="3" />
                <rect x="18" y="8" width="164" height="94" fill="#020617" />
                <rect x="25" y="25" width="60" height="4" rx="2" fill="#3b82f6" opacity="0.7" />
                <rect x="25" y="35" width="100" height="4" rx="2" fill="#60a5fa" opacity="0.5" />
              </g>
            </svg>

            {/* Orbiting Languages */}
            <div className="absolute inset-0 pointer-events-none transition-all duration-1000 flex items-center justify-center" style={{ zIndex: 100, opacity: isHovered ? 1 : 0 }}>
              {languages.map((lang, idx) => (
                <div key={idx} className="absolute animate-orbit-horizontal" style={{ animationDelay: lang.delay }}>
                  <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/90 backdrop-blur-2xl border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)] whitespace-nowrap">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span className="font-mono text-[11px] md:text-sm font-black text-white tracking-[0.3em] uppercase">{lang.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {isClicked && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-400 font-mono text-xl animate-ping font-bold z-[120]">
                {'{ COMPILING... }'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. MAIN FOOTER CONTENT */}
      <div className="bg-slate-900/80 backdrop-blur-3xl border-t border-white/5 pt-40 pb-12 px-8 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-white font-black text-2xl tracking-tighter">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                <Cpu size={22} className="text-white" />
              </div>
              DEV<span className="text-blue-500 underline decoration-blue-500/30 underline-offset-4">SCAPE</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">Pioneering the intersection of algorithmic efficiency and visual elegance.</p>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="p-3 bg-slate-800/40 rounded-xl text-slate-400 hover:text-white hover:bg-blue-600 transition-all border border-white/5">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-8 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-blue-600 rounded-full" /> Navigation
            </h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              {['Architectures', 'Live Labs', 'Open Source'].map(link => (
                <li key={link}><a href="#" className="hover:text-white transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-8 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-cyan-600 rounded-full" /> Capabilities
            </h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              {['WebGL Magic', 'Cloud Infrastructure', 'React Patterns'].map(link => (
                <li key={link}><a href="#" className="hover:text-white transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 p-6 bg-blue-600/5 rounded-3xl border border-blue-500/10 backdrop-blur-sm">
            <h4 className="text-white font-bold text-lg">Ignite a Project</h4>
            <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white text-slate-950 rounded-2xl font-bold transition-all hover:bg-blue-400 hover:text-white">
              Initiate Protocol <Mail size={18} />
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 text-slate-500 text-xs font-mono">
            <span>STATUS: OPTIMAL</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>LATENCY: 14MS</span>
          </div>
          <p className="text-slate-600 text-[10px] font-mono tracking-widest uppercase italic">// NO_CODE_IS_NOT_AN_OPTION // VER_2.1.0_PRO_MAX</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;