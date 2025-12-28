"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  /** Callback function triggered after the progress reaches 100% and a brief delay */
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prevPercent) => {
        if (prevPercent >= 100) {
          clearInterval(interval);
          // Small delay before completing to let the user see "100%"
          setTimeout(onComplete, 800);
          return 100;
        }
        // Random increment to make the loading feel more like a "kernel boot"
        const increment = Math.floor(Math.random() * 15) + 1;
        return Math.min(prevPercent + increment, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      exit={{ 
        opacity: 0, 
        scale: 1.1, 
        filter: "blur(20px)" 
      }} 
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[999] bg-[#020202] flex items-center justify-center font-mono"
    >
      <div className="w-full max-w-sm px-10">
        {/* Progress Text */}
        <div className="flex justify-between items-end mb-4 text-cyan-500 text-[10px] tracking-widest font-black uppercase">
          <span className="animate-pulse">Booting_Kernel</span>
          <span className="tabular-nums">{percent}%</span>
        </div>

        {/* Progress Bar Track */}
        <div className="h-[2px] w-full bg-white/5 overflow-hidden rounded-full">
          {/* Active Progress Bar */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }} 
            className="h-full bg-cyan-500 shadow-[0_0_20px_#06b6d4]" 
          />
        </div>

        {/* Secondary Status Line */}
        <div className="mt-4 text-white/10 text-[7px] tracking-[0.3em] uppercase flex justify-between">
          <span>Initializing_Mesh</span>
          <span>Core_v5.6.0</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;