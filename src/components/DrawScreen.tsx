"use client";

import React, { useState } from "react";
import { ArrowLeft, RotateCcw, Play, History as HistoryIcon, Copy, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { numberToJapanese, cn, safeStorage } from "@/lib/utils";
import { ASSETS } from "@/lib/assets";

interface DrawScreenProps {
  min: number;
  max: number;
  mode: "japanese" | "number";
  onBack: () => void;
  onReset: () => void;
}

const ITEM_HEIGHT = 120; // Fixed height per reel item

const getSlotTextClass = (text: string) => {
  const len = text.length;
  if (len <= 2) return "text-7xl md:text-[9rem]";
  if (len <= 3) return "text-6xl md:text-8xl";
  if (len <= 5) return "text-5xl md:text-7xl";
  if (len <= 7) return "text-4xl md:text-6xl";
  return "text-3xl md:text-5xl";
};

const DrawScreen: React.FC<DrawScreenProps> = ({ min, max, mode, onBack, onReset }) => {
  const STORAGE_KEY = `draw_history_${mode}`;
  const [result, setResult] = useState<number | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<number[]>(() => safeStorage.get(STORAGE_KEY) || []);
  const [showHistory, setShowHistory] = useState(false);
  const [reel, setReel] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const startDraw = () => {
    if (isDrawing) return;
    
    // Choose final result first
    const finalVal = Math.floor(Math.random() * (max - min + 1)) + min;
    
    // Create reel of random selections before stopping on the final result
    const newReel: string[] = [];
    for (let i = 0; i < 20; i++) {
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        newReel.push(mode === "japanese" ? numberToJapanese(randomNum) : randomNum.toString());
    }
    const finalText = mode === "japanese" ? numberToJapanese(finalVal) : finalVal.toString();
    newReel.push(finalText);

    setReel(newReel);
    setIsDrawing(true);
    setResult(null);
    setShowHistory(false);
    setCopied(false);

    // After reel finishes spinning
    setTimeout(() => {
        setResult(finalVal);
        setIsDrawing(false);
        const newHistory = [finalVal, ...history.slice(0, 9)];
        setHistory(newHistory);
        safeStorage.set(STORAGE_KEY, newHistory);
    }, 2400);
  };

  const handleCopy = () => {
    if (result === null) return;
    const text = mode === "japanese" ? numberToJapanese(result) : result.toString();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClearHistory = () => {
    setHistory([]);
    safeStorage.set(STORAGE_KEY, []);
  };

  // Get the display text for the result
  const resultText = result !== null ? (mode === "japanese" ? numberToJapanese(result) : result.toString()) : "?";

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full p-6 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-105"
        style={{ backgroundImage: `url('${ASSETS.BACKGROUND}')` }}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/10 border border-white/10 rounded-2xl text-white/50 hover:text-white transition-all text-[11px] font-black uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </motion.button>
          
          <div className="flex flex-col items-center">
            <h2 className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] mb-1">Range Settings</h2>
            <div className="bg-orange-500/10 border border-orange-500/20 px-6 py-1.5 rounded-full text-sm font-black text-orange-400">
              {min} <span className="mx-2 text-white/20">~</span> {max}
            </div>
          </div>

          <motion.button
            whileHover={{ rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="p-3 bg-white/10 hover:bg-white/10 border border-white/10 rounded-2xl text-white/50 hover:text-white transition-all"
          >
            <RotateCcw className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="glass-card min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden group shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
          <div className="absolute top-6 left-8 text-white/10 font-black text-6xl select-none uppercase tracking-tighter mix-blend-screen pointer-events-none">
            {mode === "japanese" ? "壱" : "0"}
          </div>
          <div className="absolute bottom-6 right-8 text-white/10 font-black text-6xl select-none uppercase tracking-tighter mix-blend-screen pointer-events-none">
            {mode === "japanese" ? "九" : "9"}
          </div>

          <p className="text-white/30 text-[11px] font-black uppercase tracking-[0.4em] mb-12 z-10">
            {mode === "japanese" ? "日本語 モード" : "Numeric Draw"}
          </p>
          
          <div className="relative w-full z-10 px-6 overflow-hidden" style={{ height: `${ITEM_HEIGHT}px` }}>
            <AnimatePresence mode="wait">
              {isDrawing ? (
                <motion.div
                  key="spinning-reel"
                  className="absolute top-0 left-0 right-0 flex flex-col items-center"
                  initial={{ y: 0 }}
                  animate={{ y: -(reel.length - 1) * ITEM_HEIGHT }} 
                  transition={{ 
                    duration: 2.2, 
                    ease: [0.45, 0.05, 0.55, 0.95],
                  }}
                >
                  {reel.map((item, idx) => (
                    <div 
                      key={`${item}-${idx}`} 
                      className={cn(
                        "flex-shrink-0 flex items-center justify-center font-black text-center tracking-tighter whitespace-nowrap w-full",
                        getSlotTextClass(item),
                        idx === reel.length - 1 ? "text-white" : "text-white/10 blur-[2px]"
                      )}
                      style={{ height: `${ITEM_HEIGHT}px` }}
                    >
                      {item}
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key={result === null ? "initial" : "result"}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={cn(
                    "absolute inset-0 flex items-center justify-center text-white font-black tracking-tighter text-center",
                    getSlotTextClass(resultText)
                  )}
                >
                  {resultText}
                </motion.div>
              )}
            </AnimatePresence>
            
            {isDrawing && (
              <>
                <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-[#1a1a2e] to-transparent z-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#1a1a2e] to-transparent z-20 pointer-events-none" />
              </>
            )}
          </div>

          {!isDrawing && result !== null && (
            <div className="absolute bottom-10 flex flex-col items-center gap-4 z-20">
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
                className="flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 rounded-full text-xs font-bold text-white transition-all backdrop-blur-md shadow-lg"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy Result"}
              </motion.button>
              
              <motion.div
                initial={{ scale: 0, opacity: 0, rotate: 45 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10"
              >
                <div className="w-[300px] h-[300px] bg-orange-500/20 blur-[100px] rounded-full" />
              </motion.div>
            </div>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02, translateY: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={startDraw}
          disabled={isDrawing}
          className="group relative w-full overflow-hidden p-[2px] rounded-[2.5rem] disabled:opacity-50 disabled:grayscale transition-all shadow-[0_20px_40px_-10px_rgba(249,115,22,0.3)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-400 to-white animate-gradient-x" />
          <div className="relative bg-[#0a0a0c] hover:bg-orange-500/10 transition-all rounded-[2.4rem] py-6 flex items-center justify-center gap-4">
            {isDrawing ? (
              <div className="w-6 h-6 border-[4px] border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <Play className="w-6 h-6 fill-current text-orange-500 group-hover:text-white transition-colors" />
            )}
            <span className={cn(
              "text-xl font-black uppercase tracking-widest transition-colors",
              isDrawing ? "text-white/40" : "text-white group-hover:text-white"
            )}>
              {isDrawing ? "DRAWING..." : (mode === "japanese" ? "番号를 뽑다" : "DRAW RESULT")}
            </span>
          </div>
        </motion.button>

        {history.length > 0 && (
          <div className="flex flex-col items-center">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={cn(
                "flex items-center gap-2 px-6 py-2 rounded-full border transition-all text-[11px] font-black uppercase tracking-widest",
                showHistory 
                    ? "bg-white text-black border-white" 
                    : "bg-white/10 text-white/30 border-white/10 hover:text-white hover:bg-white/10"
              )}
            >
              <HistoryIcon className="w-4 h-4" />
              Draw History ({history.length})
            </button>

            <AnimatePresence>
              {showHistory && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: 10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: 10 }}
                  className="w-full mt-6 glass rounded-[2.5rem] p-8 border border-white/10"
                >
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-white/20 text-xs font-black uppercase tracking-[0.2em] ml-1">Drawing Logs</h3>
                    <button 
                      onClick={handleClearHistory} 
                      className="text-[9px] font-black uppercase tracking-widest text-red-500/50 hover:text-red-500 px-3 py-1 rounded-lg border border-transparent hover:border-red-500/20 transition-all"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {history.map((num, i) => (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key={`${num}-${i}`}
                        className={cn(
                          "flex flex-col items-center justify-center p-4 rounded-2xl border transition-all h-24",
                          i === 0 
                            ? "bg-orange-500 border-orange-400 text-white shadow-lg" 
                            : "bg-white/10 text-white/40 border-white/10"
                        )}
                      >
                        <span className="text-xl font-black">{mode === "japanese" ? numberToJapanese(num) : num}</span>
                        {mode === "japanese" && (
                          <span className="text-[10px] opacity-30 font-bold mt-1">{num}</span>
                        )}
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
