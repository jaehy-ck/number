"use client";

import React, { useState } from "react";
import { ChevronLeft, Check, AlertCircle } from "lucide-react";
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
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#1a1a2e] p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="bg-[#252542] border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/60 hover:text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-white tracking-tight">범위 설정</h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider ml-1">
                시작 번호 (Min)
              </label>
              <input
                type="number"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                placeholder="예: 1"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider ml-1">
                끝 번호 (Max)
              </label>
              <input
                type="number"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                placeholder="예: 100"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleConfirm}
              className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.98] transition-all p-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
            >
              <Check className="w-5 h-5" />
              설정 완료
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RangeInput;
