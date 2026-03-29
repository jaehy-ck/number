"use client";

import React, { useState } from "react";
import { ChevronLeft, Check, AlertCircle, Settings2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface RangeInputProps {
  onConfirm: (min: number, max: number) => void;
  onBack: () => void;
}

const RangeInput: React.FC<RangeInputProps> = ({ onConfirm, onBack }) => {
  const [min, setMin] = useState<string>("");
  const [max, setMax] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleConfirm = () => {
    const minNum = parseInt(min, 10);
    const maxNum = parseInt(max, 10);

    if (isNaN(minNum) || isNaN(maxNum)) {
      setError("숫자만 입력해 주세요 (Numbers only)");
      return;
    }

    if (minNum >= maxNum) {
      setError("시작 숫자는 끝 숫자보다 작아야 합니다");
      return;
    }

    if (minNum < 0 || maxNum < 0) {
      setError("양수만 입력해 주세요 (Positive numbers only)");
      return;
    }

    setError("");
    onConfirm(minNum, maxNum);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-[#0a0a0c] p-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="glass-card p-10 md:p-14 overflow-hidden">
          <div className="flex items-center justify-between mb-10">
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={onBack}
              className="p-3 bg-white/10 hover:bg-white/10 rounded-2xl transition-all text-white/40 hover:text-white border border-white/10"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <div className="text-right">
              <h2 className="text-3xl font-black text-white tracking-tighter">범위 설정</h2>
              <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-1">Configure Range</p>
            </div>
          </div>

          <div className="space-y-10">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-accent-glow rounded-[2rem] blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <div className="relative space-y-3">
                <label className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  시작 번호 (Min)
                </label>
                <input
                  type="number"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                  placeholder="예: 1"
                  className="w-full bg-white/10 border border-white/10 rounded-[1.5rem] px-8 py-5 text-xl font-bold text-white placeholder-white/10 focus:outline-none focus:ring-1 focus:ring-orange-500/30 transition-all text-center"
                />
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-accent-glow rounded-[2rem] blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <div className="relative space-y-3">
                <label className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  끝 번호 (Max)
                </label>
                <input
                  type="number"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                  placeholder="예: 100"
                  className="w-full bg-white/10 border border-white/10 rounded-[1.5rem] px-8 py-5 text-xl font-bold text-white placeholder-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all text-center"
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-medium"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleConfirm}
              className="w-full overflow-hidden bg-white text-black font-black text-lg py-5 rounded-[1.5rem] flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:bg-white/90 transition-all"
            >
              <Check className="w-6 h-6" />
              설정 완료
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RangeInput;
