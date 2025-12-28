"use client";
import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Activity, ArrowRight } from 'lucide-react';

// --- Sub-Component: Section Wrapper ---
const Section = ({ children, id, className = "" }: { children: React.ReactNode, id: string, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-10% 0px -10% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center", "end start"] });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [10, 0, 0, 10]);

  return (
    <motion.section 
      ref={ref} 
      id={id} 
      style={{ opacity, scale, filter: `blur(${blur}px)` }} 
      className={`min-h-[90vh] flex flex-col justify-center relative ${className}`}
    >
      <div className={`transition-all duration-1000 ease-out ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        {children}
      </div>
    </motion.section>
  );
};

// --- Sub-Component: Animated Illustration ---
const ProgrammerSVG = ({ mousePos, isHovered, eyeX, eyeY, showGreeting = false }: any) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className={`absolute -inset-10 bg-blue-500/10 blur-[80px] rounded-full transition-all duration-1000 ${isHovered ? 'opacity-100 scale-110' : 'opacity-40 scale-90'}`} />
      
      {showGreeting && isHovered && (
        <motion.div initial={{ opacity: 0, x: -10, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} className="absolute top-[30%] left-[65%] z-30 pointer-events-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-white rotate-45 -mr-1.5 shadow-[-2px_2px_5px_rgba(0,0,0,0.05)]" />
            <div className="px-5 py-2.5 rounded-2xl bg-white border border-white shadow-[0_15px_40px_rgba(0,0,0,0.25)]">
               <span className="text-xs font-mono font-black text-[#02040a] uppercase tracking-widest whitespace-nowrap">helloooo!</span>
            </div>
          </div>
        </motion.div>
      )}

      <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-[0_0_50px_rgba(59,130,246,0.15)] relative z-20 overflow-visible">
        <rect x="50" y="420" width="400" height="15" rx="4" fill="#0f172a" />
        <rect x="40" y="435" width="420" height="5" rx="2" fill="#1e293b" />
        <g transform="translate(380, 360)"><path d="M0 0 L30 0 L25 40 L5 40 Z" fill="#e2e8f0" /><path d="M30 10 Q40 10 40 20 Q40 30 30 30" fill="none" stroke="#e2e8f0" strokeWidth="4" /></g>
        <g>
          <path d="M180 420 Q180 280 250 280 Q320 280 320 420" fill="#1e293b" />
          <path d="M200 420 L300 420 L280 320 L220 320 Z" fill="#334155" />
          <g transform={`translate(${mousePos.x * 5}, ${mousePos.y * 3})`}>
            <circle cx="250" cy="240" r="45" fill="#f1f5f9" />
            <g transform={`translate(${eyeX}, ${eyeY})`}><circle cx="230" cy="240" r="4" fill="#0f172a" /><circle cx="270" cy="240" r="4" fill="#0f172a" /></g>
            <g><rect x="218" y="234" width="28" height="15" rx="3" stroke="#0f172a" fill="none" strokeWidth="1.5" /><rect x="254" y="234" width="28" height="15" rx="3" stroke="#0f172a" fill="none" strokeWidth="1.5" /><path d="M246 241 L254 241" stroke="#0f172a" strokeWidth="1.5" /></g>
          </g>
          <g style={{ transformOrigin: '305px 330px', transform: isHovered ? 'rotate(0deg)' : 'rotate(35deg)', opacity: isHovered ? 1 : 0 }} className={isHovered ? "animate-wave-optimized" : ""}>
            <path d="M305 330 L335 275" stroke="#1e293b" strokeWidth="34" strokeLinecap="round" /><path d="M335 275 L355 215" stroke="#f1f5f9" strokeWidth="28" strokeLinecap="round" /><circle cx="355" cy="215" r="18" fill="#f1f5f9" />
          </g>
        </g>
        <g transform="translate(150, 300)"><rect x="10" y="0" width="180" height="110" rx="6" fill="#0f172a" stroke="#475569" strokeWidth="3" /><rect x="18" y="8" width="164" height="94" fill="#020617" /></g>
      </svg>
    </div>
  );
};

// --- MAIN HERO SECTION COMPONENT ---
const Hero = () => {
  const [isHoveredHero, setIsHoveredHero] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setMousePos({ 
      x: (clientX - centerX) / centerX, 
      y: (clientY - centerY) / centerY 
    });
  };

  const eyeX = mousePos.x * 5;
  const eyeY = mousePos.y * 3;

  return (
    <div onMouseMove={handleMouseMove} className="w-full">
      <Section id="home">
        <div className="max-w-7xl w-full relative z-10 py-20">
          {/* Header Status Bar */}
          <div className="flex items-center gap-5 mb-16 overflow-hidden">
             <div className="flex items-center gap-2 px-4 py-1.5 rounded-sm bg-blue-500/5 border border-blue-500/10 text-blue-400 font-mono text-[9px] font-black uppercase tracking-[0.4em]">
                <Activity size={10} className="animate-pulse" />
                System_Status: Optimal
             </div>
             <div className="h-px flex-grow max-w-[80px] bg-white/10" />
             <div className="text-white/20 font-mono text-[9px] uppercase tracking-[0.6em] whitespace-nowrap">Deployment: 5.6.0_PRO_V</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-12">
              <div style={{ transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 10}px, 0)`, transition: 'transform 0.2s ease-out' }}>
                <h1 className="text-[clamp(3rem,8vw,7rem)] font-black tracking-tighter leading-[0.75] uppercase italic text-white relative">
                  Digital <br />
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-slate-100 to-cyan-400 drop-shadow-2xl">Architect</span>
                  <span className="text-blue-500 ml-2">.</span>
                </h1>
              </div>

              <p className="text-slate-400 text-xl md:text-2xl font-light leading-relaxed max-w-2xl border-l-2 border-blue-500/20 pl-10 italic">
                Synthesizing <span className="text-white font-medium">high-performance engineering</span> with cinematic visual narratives. 
                Building distributed interfaces that bridge the gap between human logic and hardware efficiency.
              </p>
              
              <div className="flex flex-wrap gap-8 items-center pt-4">
                <button className="relative group px-12 py-6 overflow-hidden rounded-sm bg-white transition-all duration-700 hover:scale-105 active:scale-95">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <span className="relative flex items-center gap-4 text-black group-hover:text-white font-black text-xs uppercase tracking-[0.3em]">
                    Initiate Protocol <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
                  </span>
                </button>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-px bg-white/20" />
                  <span className="text-slate-500 font-mono text-[10px] uppercase tracking-widest after:content-['_'] after:animate-pulse">Awaiting_Command</span>
                </div>
              </div>
            </div>

            {/* Right Illustration */}
            <div 
              className="lg:col-span-5 h-[500px] relative cursor-pointer"
              onMouseEnter={() => setIsHoveredHero(true)}
              onMouseLeave={() => setIsHoveredHero(false)}
            >
              <ProgrammerSVG mousePos={mousePos} isHovered={isHoveredHero} eyeX={eyeX} eyeY={eyeY} showGreeting={true} />
            </div>
          </div>
        </div>
      </Section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes waveOptimized {
          0%, 100% { transform: translate3d(0,0,0) rotate(0deg); }
          50% { transform: translate3d(0,0,0) rotate(-28deg); }
        }
        .animate-wave-optimized {
          animation: waveOptimized 1.4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }
      `}} />
    </div>
  );
};

export default Hero;