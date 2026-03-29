"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, RotateCcw, Play, History as HistoryIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { numberToJapanese, cn } from "@/lib/utils";

interface DrawScreenProps {
  min: number;
  max: number;
  mode: "japanese" | "number";
  onBack: () => void;
  onReset: () => void;
}

const DrawScreen: React.FC<DrawScreenProps> = ({ min, max, mode, onBack, onReset }) => {
  const [result, setResult] = useState<number | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<number[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [displayValue, setDisplayValue] = useState<string>("?");

  const startDraw = () => {
    if (isDrawing) return;
    setIsDrawing(true);
    setShowHistory(false);

    let count = 0;
    const duration = 2000;
    const interval = 80;
    const totalSteps = duration / interval;

    const timer = setInterval(() => {
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      setDisplayValue(mode === "japanese" ? numberToJapanese(randomNum) : randomNum.toString());
      count++;

      if (count >= totalSteps) {
        clearInterval(timer);
        const finalNum = Math.floor(Math.random() * (max - min + 1)) + min;
        setResult(finalNum);
        setDisplayValue(mode === "japanese" ? numberToJapanese(finalNum) : finalNum.toString());
        setHistory((prev) => [finalNum, ...prev.slice(0, 9)]);
        setIsDrawing(false);
      }
    }, interval);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-vh-100 w-full p-6 overflow-hidden">
      {/* Background Image with Blur Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('https://media.istockphoto.com/id/1129069115/ko/%EC%82%AC%EC%A7%84/%EB%82%AE%EC%97%90-%EC%9D%BC%EB%B3%B8-%ED%92%8D%EA%B2%BD.jpg?s=1024x1024&w=is&k=20&c=Dg_F8NtqdCtuUer3T4lJO5LUCd7YemDcfJZ-joP2g0M=')` }}
      >
        <div className="absolute inset-0 bg-[#1a1a2e]/80 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 w-full max-w-lg flex flex-col gap-8">
        {/* Header Controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/60 hover:text-white transition-all text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            뒤로
          </button>
          
          <div className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-semibold text-white/50 space-x-2">
            <span>범위:</span>
            <span className="text-white">{min} ~ {max}</span>
          </div>

          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/60 hover:text-white transition-all text-sm font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            초기화
          </button>
        </div>

        {/* Main Result Area */}
        <motion.div
          layout
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-12 shadow-2xl flex flex-col items-center justify-center min-h-[320px] relative overflow-hidden"
        >
          <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] mb-4">
            {mode === "japanese" ? "日本語モード" : "Number Mode"}
          </p>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={displayValue}
              initial={{ y: isDrawing ? 20 : 0, opacity: isDrawing ? 0 : 1 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: isDrawing ? -20 : 0, opacity: isDrawing ? 0 : 1 }}
              transition={{ duration: 0.1 }}
              className={cn(
                "text-7xl md:text-8xl font-black text-white text-center selection:bg-orange-500",
                isDrawing && "animate-pulse color-orange-400"
              )}
            >
              {displayValue}
            </motion.div>
          </AnimatePresence>

          {/* Particle Effects (Mockup for high-end feel) */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-orange-500/10 to-transparent opacity-30" />
        </motion.div>

        {/* Action Button */}
        <button
          onClick={startDraw}
          disabled={isDrawing}
          className="group relative w-full bg-orange-500 hover:bg-orange-600 disabled:bg-white/5 disabled:text-white/20 p-6 rounded-[2rem] font-bold text-xl text-white flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-2xl shadow-orange-500/20"
        >
          {isDrawing ? (
            <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <Play className="w-6 h-6 fill-current" />
          )}
          <span>{isDrawing ? "추첨 중..." : (mode === "japanese" ? "番号を引く" : "번호 뽑기")}</span>
        </button>

        {/* History Toggle */}
        {history.length > 0 && (
          <div className="mt-4 flex flex-col items-center">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-sm font-medium"
            >
              <HistoryIcon className="w-4 h-4" />
              {showHistory ? "기록 숨기기" : `기록 보기 (${history.length})`}
            </button>

            <AnimatePresence>
              {showHistory && (
                <motion.div
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: 10, height: 0 }}
                  className="w-full mt-6 bg-white/5 border border-white/10 rounded-2xl p-6 overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white/60 text-xs font-bold uppercase tracking-widest whitespace-nowrap overflow-hidden text-ellipsis">최근 추첨 기록</h3>
                    <button onClick={() => setHistory([])} className="text-xs text-white/20 hover:text-red-400">Clear</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {history.map((num, i) => (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        key={`${num}-${i}`}
                        className={cn(
                          "px-4 py-2 rounded-xl text-sm font-bold transition-all",
                          i === 0 ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "bg-white/5 text-white/50 border border-white/10"
                        )}
                      >
                        {mode === "japanese" ? numberToJapanese(num) : num}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default DrawScreen;
