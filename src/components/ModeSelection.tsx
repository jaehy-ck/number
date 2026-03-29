"use client";

import React from "react";
import { Languages, Hash, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { ASSETS } from "@/lib/assets";

interface ModeSelectionProps {
  onSelect: (mode: "japanese" | "number") => void;
}

const ModeSelection: React.FC<ModeSelectionProps> = ({ onSelect }) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden">
      {/* Decorative Characters from Assets */}
      <motion.div
        initial={{ opacity: 0, x: -100, filter: "blur(10px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="absolute bottom-0 left-[-10%] md:left-[2%] w-[50%] md:w-[35%] max-w-[450px] z-0 pointer-events-none select-none overflow-hidden opacity-50 md:opacity-100"
      >
        <img
          src={ASSETS.CHARACTER_LEFT}
          alt="Home Left Character"
          className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -scale-x-100 md:scale-x-100 translate-y-10"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100, filter: "blur(10px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        className="absolute bottom-0 right-[-10%] md:right-[2%] w-[50%] md:w-[35%] max-w-[450px] z-0 pointer-events-none select-none overflow-hidden opacity-50 md:opacity-100"
      >
        <img
          src={ASSETS.CHARACTER_RIGHT}
          alt="Home Right Character"
          className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] translate-y-10"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-xl px-6"
      >
        <div className="glass-card p-10 md:p-14 overflow-hidden group">
          {/* Subtle Glow Header */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

          <header className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4"
            >
              <Sparkles className="w-3 h-3" />
              Interactive Mode
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              모드 선택
            </h1>
            <p className="text-white/40 text-sm font-medium tracking-wide">
              Select your preferred drawing experience
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.button
              whileHover={{ scale: 1.02, translateY: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect("japanese")}
              className="group relative flex flex-col items-center gap-6 p-8 rounded-[2rem] bg-white/10 hover:bg-orange-500/10 border border-white/10 hover:border-orange-500/30 transition-all duration-300"
            >
              <div className="w-20 h-20 rounded-3xl bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all duration-500 overflow-hidden">
                <Languages className="w-10 h-10 text-orange-500 group-hover:text-white transition-colors" />
              </div>
              <div className="text-center">
                <span className="block text-xl font-bold text-white mb-1">日本語モード</span>
                <span className="block text-[10px] text-white/30 group-hover:text-orange-400/80 font-bold uppercase tracking-widest transition-colors">
                  Japanese Mode
                </span>
              </div>

              {/* Card Decoration */}
              <div className="absolute top-4 right-4 text-white/10 font-black text-4xl select-none group-hover:text-orange-500/10 transition-colors">
                あ
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, translateY: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect("number")}
              className="group relative flex flex-col items-center gap-6 p-8 rounded-[2rem] bg-white/10 hover:bg-blue-500/10 border border-white/10 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="w-20 h-20 rounded-3xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:shadow-[0_0_30px_rgba(14,165,233,0.4)] transition-all duration-500 overflow-hidden">
                <Hash className="w-10 h-10 text-blue-400 group-hover:text-white transition-colors" />
              </div>
              <div className="text-center">
                <span className="block text-xl font-bold text-white mb-1">숫자 모드</span>
                <span className="block text-[10px] text-white/30 group-hover:text-blue-400/80 font-bold uppercase tracking-widest transition-colors">
                  Number Mode
                </span>
              </div>

              {/* Card Decoration */}
              <div className="absolute top-4 right-4 text-white/10 font-black text-4xl select-none group-hover:text-blue-500/10 transition-colors">
                7
              </div>
            </motion.button>
          </div>

          <footer className="mt-12 text-center text-[10px] text-white/20 font-bold tracking-[0.3em] uppercase">
            Made by : jaehy-ck | skr6582
          </footer>
        </div>
      </motion.div>
    </div>
  );
};

export default ModeSelection;
