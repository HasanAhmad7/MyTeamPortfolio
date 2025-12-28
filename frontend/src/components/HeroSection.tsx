"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Terminal, Code2, Zap, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

// --- Sub-Component: Section Wrapper ---
const Section = ({ children, id, className = "" }: { children: React.ReactNode, id: string, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-15% 0px -15% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

  return (
    <motion.section ref={ref} id={id} style={{ opacity }} className={`min-h-[85vh] flex flex-col justify-start relative pt-40 px-8 ${className}`}>
      <div className={`transition-all duration-[1200ms] cubic-bezier(0.2, 0.8, 0.2, 1) ${isInView ? 'translate-y-0 blur-0 opacity-100' : 'translate-y-16 blur-2xl opacity-0'}`}>
        {children}
      </div>
    </motion.section>
  );
};

// --- Typing Animation Component ---
const TypingText = ({ texts }: { texts: string[] }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentText.length) {
          setDisplayedText(currentText.substring(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentText.substring(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((currentTextIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentTextIndex, texts]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// --- Developer Illustration Component ---
const DeveloperIllustration = ({ isHovered, mousePos, eyeX, eyeY }: { isHovered: boolean; mousePos: { x: number; y: number }; eyeX: number; eyeY: number }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Ambient Glow - Dark Blue */}
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-600/30 via-blue-900/40 to-cyan-500/30 blur-[120px] rounded-full transition-all duration-1000 ${isHovered ? 'opacity-100 scale-110' : 'opacity-60 scale-90'}`} />

      {/* Greeting Speech Bubble */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 5, scale: 0.95 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="absolute top-[5%] left-1/2 -translate-x-1/2 z-40 pointer-events-none"
        >
          <div className="relative px-5 py-2.5 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10" />
            <div className="relative flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-sm font-medium text-blue-100 tracking-wide">
                Helloooo! 👋
              </span>
            </div>
            {/* Glassy Tail */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-slate-900/40 backdrop-blur-xl border-b border-r border-white/10 rotate-45" />
          </div>
        </motion.div>
      )}

      {/* Developer SVG Character */}
      <svg viewBox="0 0 500 500" className={`w-full h-full drop-shadow-2xl relative z-20 transition-all duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}>
        <defs>
          <linearGradient id="hoodGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="50%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="hoodInner" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#020617" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>

        <rect x="50" y="420" width="400" height="15" rx="4" fill="#0f172a" />
        <rect x="40" y="435" width="420" height="5" rx="2" fill="#1e293b" />

        {/* Coffee Cup */}
        <g transform="translate(380, 360)">
          <path d="M0 0 L30 0 L25 40 L5 40 Z" fill="#e2e8f0" />
          <path d="M30 10 Q40 10 40 20 Q40 30 30 30" fill="none" stroke="#e2e8f0" strokeWidth="4" />
        </g>

        {/* Body and Legs */}
        <path d="M180 420 Q180 280 250 280 Q320 280 320 420" fill="#1e293b" />
        <path d="M200 420 L300 420 L280 320 L220 320 Z" fill="#334155" />

        {/* Head with mouse tracking */}
        <g transform={`translate(${mousePos.x * 5}, ${mousePos.y * 3})`}>
          {/* Face */}
          <circle cx="250" cy="240" r="45" fill="#f1f5f9" />

          {/* Eyes tracking mouse */}
          <g transform={`translate(${eyeX}, ${eyeY})`}>
            <circle cx="230" cy="240" r="4" fill="#0f172a" />
            <circle cx="270" cy="240" r="4" fill="#0f172a" />
          </g>

          {/* Glasses */}
          <g>
            <rect x="218" y="234" width="28" height="15" rx="3" stroke="#0f172a" fill="none" strokeWidth="1.5" />
            <rect x="254" y="234" width="28" height="15" rx="3" stroke="#0f172a" fill="none" strokeWidth="1.5" />
            <path d="M246 241 L254 241" stroke="#0f172a" strokeWidth="1.5" />
          </g>

          {/* Headphones - Hidden when hoodie up */}
          <g transform="translate(0, -5)" className={`transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <path d="M205 240 A45 45 0 0 1 295 240" fill="none" stroke="#0f172a" strokeWidth="8" />
            <rect x="192" y="230" width="16" height="34" rx="6" fill="#0f172a" />
            <rect x="292" y="230" width="16" height="34" rx="6" fill="#0f172a" />
          </g>

          {/* HOODIE UP STATE - Chin Visible Version */}
          <g
            className={`transition-all duration-500 ease-in-out ${isHovered ? 'opacity-0 -translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'}`}
            style={{ transformOrigin: '250px 240px' }}
          >
            {/* Outer Hood: Curved up at bottom to show chin */}
            <path d="M180 280 C 180 190, 210 150, 250 150 C 290 150, 320 190, 320 280 L 315 310 C 300 290, 280 265, 250 265 C 220 265, 200 290, 185 310 Z" fill="url(#hoodGradient)" />

            {/* Inner Hood Shadow - framing the face */}
            <path d="M195 270 C 195 205, 220 180, 250 180 C 280 180, 305 205, 305 270 C 305 280, 290 270, 250 270 C 210 270, 195 280, 195 270" fill="url(#hoodInner)" opacity="0.5" />

            {/* Hood Edge/Rim */}
            <path d="M195 270 C 195 205, 220 180, 250 180 C 280 180, 305 205, 305 270" fill="none" stroke="#334155" strokeWidth="3" opacity="0.6" strokeLinecap="round" />

            {/* Drawstrings */}
            <path d="M225 300 Q 225 330 222 350" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
            <path d="M275 300 Q 275 330 278 350" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />

            {/* Aglets */}
            <circle cx="222" cy="352" r="2" fill="#94a3b8" />
            <circle cx="278" cy="352" r="2" fill="#94a3b8" />
          </g>
        </g>

        {/* HOODIE DOWN STATE - Simple & Clean */}
        <g
          className={`transition-all duration-500 ease-in-out ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
          transform="translate(250, 290)"
        >
          {/* Simple Collar Shape */}
          <path d="M-55 5 C -60 -5, -40 -15, -30 0 Q 0 15, 30 0 C 40 -15, 60 -5, 55 5 Q 35 30, 0 30 Q -35 30, -55 5 Z" fill="url(#hoodGradient)" />

          {/* Inner fold shadow */}
          <path d="M-40 5 Q 0 20, 40 5" fill="none" stroke="#020617" strokeWidth="2" opacity="0.3" strokeLinecap="round" />

          {/* Drawstrings */}
          <path d="M-20 15 Q -22 35, -20 45" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
          <path d="M20 15 Q 22 35, 20 45" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Waving Hand - Delayed Animation */}
        <g
          style={{
            transformOrigin: '320px 280px',
            transition: 'all 0.5s ease-out',
            transitionDelay: isHovered ? '0.3s' : '0s',
            transform: isHovered ? 'rotate(0deg)' : 'rotate(45deg)',
            opacity: isHovered ? 1 : 0
          }}
          className={isHovered ? "animate-wave-smooth" : ""}
        >
          <path d="M310 320 L340 260" stroke="#334155" strokeWidth="30" strokeLinecap="round" />
          <path d="M340 260 L365 200" stroke="#f1f5f9" strokeWidth="25" strokeLinecap="round" />
          <circle cx="365" cy="200" r="16" fill="#f1f5f9" />
        </g>

        {/* Keyboard */}
        <g transform="translate(160, 390)">
          <rect x="0" y="0" width="180" height="25" rx="4" fill="#0f172a" />
        </g>

        {/* Laptop */}
        <g transform="translate(150, 300)">
          <rect x="10" y="0" width="180" height="110" rx="6" fill="#0f172a" stroke="#475569" strokeWidth="3" />
          <rect x="18" y="8" width="164" height="94" fill="#020617" />
          <rect x="25" y="25" width="60" height="4" rx="2" fill="#3b82f6" opacity="0.7" />
          <rect x="25" y="35" width="100" height="4" rx="2" fill="#60a5fa" opacity="0.5" />
        </g>

        {/* Decorative shadow */}
        <ellipse cx="250" cy="435" rx="120" ry="8" fill="#000000" opacity="0.2" />
      </svg>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes waveSmooth { 
          0%, 100% { transform: translate3d(0,0,0) rotate(0deg); } 
          50% { transform: translate3d(0,0,0) rotate(-28deg); } 
        }
        .animate-wave-smooth { animation: waveSmooth 1.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite; }
      `}} />
    </div>
  );
};

// --- MAIN HERO SECTION ---
const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setMousePos({ x: (clientX - centerX) / centerX, y: (clientY - centerY) / centerY });
  };

  const eyeX = mousePos.x * 5;
  const eyeY = mousePos.y * 3;

  return (
    <div onMouseMove={handleMouseMove} className="w-full">
      <Section id="home">
        <div className="max-w-7xl w-full relative z-10">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/20 backdrop-blur-sm">
              <div className="relative">
                <Zap size={14} className="text-emerald-400 animate-pulse" />
                <div className="absolute inset-0 bg-emerald-400/30 blur-md rounded-full animate-pulse" />
              </div>
              <span className="text-blue-300 font-mono text-xs font-semibold tracking-wider">AVAILABLE FOR WORK</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <Terminal size={24} className="text-blue-400" />
                  <span className="text-slate-400 font-mono text-sm tracking-wide">console.log("Hello World!")</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{
                  transform: `translate3d(${mousePos.x * 15}px, ${mousePos.y * 10}px, 0)`,
                  transition: 'transform 0.3s ease-out'
                }}
              >
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]">
                  <span className="block text-white font-sans">Full Stack</span>
                  <TypingText texts={['Developer', 'Engineer', 'Creator', 'Innovator']} />
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl font-light"
              >
                Crafting scalable web applications with{' '}
                <span className="text-blue-300 font-medium">modern technologies</span>.
                Passionate about clean code, elegant UIs, and solving complex problems.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-3"
              >
                {['React', 'Next.js', 'TypeScript', 'Node.js', 'TailwindCSS'].map((tech, i) => (
                  <div
                    key={tech}
                    className="px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 text-sm font-mono hover:bg-slate-700/50 hover:border-blue-500/30 transition-all duration-300 cursor-default"
                  >
                    {tech}
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-6 items-center pt-4"
              >
                <button className="group relative px-8 py-4 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 active:scale-95">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative flex items-center gap-3 text-white font-semibold text-base">
                    View Projects <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </button>

                <div className="flex items-center gap-4">
                  {[
                    { icon: Github, href: '#' },
                    { icon: Linkedin, href: '#' },
                    { icon: Mail, href: '#' }
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:bg-slate-700/50 hover:border-blue-500/30 hover:text-blue-400 transition-all duration-300"
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Content - Developer Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-5 h-[500px] relative cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <DeveloperIllustration isHovered={isHovered} mousePos={mousePos} eyeX={eyeX} eyeY={eyeY} />
            </motion.div>
          </div>
        </div>
      </Section>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes waveSmooth { 
          0%, 100% { transform: translate3d(0,0,0) rotate(0deg); } 
          50% { transform: translate3d(0,0,0) rotate(-28deg); } 
        }
        .animate-wave-smooth { animation: waveSmooth 1.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite; }
      `}} />
    </div>
  );
};

export default Hero;