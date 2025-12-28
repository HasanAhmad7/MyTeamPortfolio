"use client";

import React, { useState, useRef } from 'react';
import { ExternalLink, Github, Layers, ChevronRight } from 'lucide-react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  color: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  isVisible: boolean;
}

/**
 * ProjectCard Component
 * Features: 
 * - Perspective 3D entrance animation
 * - Radial gradient mouse-tracking hover effect
 * - Cinematic light sweep on visibility trigger
 */
const ProjectCard = ({ project, index, isVisible }: ProjectCardProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      style={{ 
        transitionDelay: `${index * 150}ms`,
        perspective: '1000px'
      }}
      className={`group relative bg-slate-900/60 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-8 
        transition-all duration-[1200ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]
        hover:-translate-y-3 hover:border-blue-500/40 overflow-hidden cursor-default
        ${isVisible 
          ? 'opacity-100 blur-0 translate-y-0 rotate-x-0 scale-100' 
          : 'opacity-0 blur-2xl translate-y-24 rotate-x-12 scale-90 pointer-events-none'
        }
      `}
    >
      {/* 1. Cinematic Focus Glow (Static subtle background) */}
      <div className={`absolute inset-0 bg-blue-600/5 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* 2. Hover Light Follow (Dynamic radial gradient) */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl z-30"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.12), transparent 80%)`,
        }}
      />

      {/* 3. Cinematic Light Sweep Animation (Triggered once on visibility) */}
      <div className={`absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 transition-all duration-[1500ms] ease-in-out ${isVisible ? 'translate-x-[200%]' : '-translate-x-full'}`} />

      {/* Content Layout */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Top Bar: Icon & External Links */}
        <div className="flex justify-between items-start mb-8">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-2xl shadow-blue-500/40 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-700`}>
            <Layers className="text-white w-7 h-7" />
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-full bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
              <Github size={18} />
            </button>
            <button className="p-2 rounded-full bg-slate-800/50 text-slate-400 hover:text-blue-400 hover:bg-slate-700 transition-all">
              <ExternalLink size={18} />
            </button>
          </div>
        </div>

        {/* Middle Section: Title & Description */}
        <div>
          <span className="inline-block px-3 py-1 rounded-md bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 border border-blue-500/10">
            {project.category}
          </span>
          
          <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors tracking-tight">
            {project.title}
          </h3>
          
          <p className="text-slate-400 leading-relaxed mb-8 text-base font-light">
            {project.description}
          </p>
        </div>

        {/* Bottom Section: Tags & Case Study Link */}
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-slate-800/30 text-slate-400 text-xs rounded-full border border-slate-700/30 group-hover:border-blue-500/20 transition-colors">
                {tag}
              </span>
            ))}
          </div>

          <button className="group/btn flex items-center gap-2 text-white font-medium text-sm py-2 px-1 hover:gap-3 transition-all duration-300">
            View Case Study
            <ChevronRight size={16} className="text-blue-400 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;