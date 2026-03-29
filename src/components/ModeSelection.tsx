"use client";

import React from "react";
import { Languages, Hash } from "lucide-react";
import { motion } from "framer-motion";

interface ModeSelectionProps {
  onSelect: (mode: "japanese" | "number") => void;
}

const ModeSelection: React.FC<ModeSelectionProps> = ({ onSelect }) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-vh-100 w-full overflow-hidden bg-gradient-to-br from-[#1e3a5f] via-[#1a1a2e] to-[#4a1a3d]">
      {/* Background Characters */}
      <motion.img
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        src="https://img.extmovie.com/files/attach/images/174/500/322/005/b8a36bfbe9ab62a7e89ff08505d49adf.png"
        alt="Doraemon"
        className="absolute bottom-[10%] left-[5%] h-[40%] md:h-[60%] max-h-[450px] object-contain pointer-events-none z-0 opacity-80 md:opacity-100"
      />
      <motion.img
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMlJyXqqoN2or5uw4LPZJpvfZ0NtqQHjnsbg&s"
        alt="Character"
        className="absolute bottom-[10%] right-[5%] h-[40%] md:h-[60%] max-h-[450px] object-contain pointer-events-none z-0 opacity-80 md:opacity-100"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <header className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">모드 선택</h1>
            <p className="text-blue-200/60 text-sm">Select your preferred mode</p>
          </header>

          <div className="space-y-4">
            <button
              onClick={() => onSelect("japanese")}
              className="group w-full flex items-center p-5 bg-white/5 hover:bg-orange-500 border border-white/10 hover:border-orange-400 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="bg-orange-500/20 group-hover:bg-white/20 p-3 rounded-xl mr-4 transition-colors">
                <Languages className="w-6 h-6 text-orange-400 group-hover:text-white" />
              </div>
              <div className="text-left">
                <span className="block text-lg font-semibold text-white">日本語モード</span>
                <span className="block text-xs text-blue-200/50 group-hover:text-white/70 tracking-wide">Japanese Mode</span>
              </div>
            </button>

            <button
              onClick={() => onSelect("number")}
              className="group w-full flex items-center p-5 bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-400 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="bg-blue-600/20 group-hover:bg-white/20 p-3 rounded-xl mr-4 transition-colors">
                <Hash className="w-6 h-6 text-blue-400 group-hover:text-white" />
              </div>
              <div className="text-left">
                <span className="block text-lg font-semibold text-white">숫자 모드</span>
                <span className="block text-xs text-blue-200/50 group-hover:text-white/70 tracking-wide">Number Mode</span>
              </div>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ModeSelection;
