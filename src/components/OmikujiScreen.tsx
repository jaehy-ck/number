"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, RotateCcw, History as HistoryIcon, Play, Copy, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, safeStorage } from "@/lib/utils";
import { ASSETS } from "@/lib/assets";

interface OmikujiScreenProps {
  min: number;
  max: number;
  onBack: () => void;
  onReset: () => void;
}

type DrawStep = "idle" | "shaking" | "dropping" | "revealing" | "done";

const OmikujiScreen: React.FC<OmikujiScreenProps> = ({ min, max, onBack, onReset }) => {
  const STORAGE_KEY = "omikuji_history";
  const [result, setResult] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>(() => safeStorage.get(STORAGE_KEY) || []);
  const [showHistory, setShowHistory] = useState(false);
  const [step, setStep] = useState<DrawStep>("idle");
  const [copied, setCopied] = useState(false);

  const startDraw = () => {
    if (step !== "idle" && step !== "done") return;
    
    setStep("shaking");
    setResult(null);
    setShowHistory(false);

    const finalVal = Math.floor(Math.random() * (max - min + 1)) + min;
    
    // Animation sequence timings
    setTimeout(() => {
      setStep("dropping");
    }, 1200); // Shake for 1.2s

    setTimeout(() => {
      setStep("revealing");
    }, 1800); // Drop stick for 0.6s

    setTimeout(() => {
      setResult(finalVal);
      setStep("done");
      const newHistory = [finalVal, ...history.slice(0, 9)];
      setHistory(newHistory);
      safeStorage.set(STORAGE_KEY, newHistory);
    }, 2800); // Reveal paper fully 
  };

  const handleCopy = () => {
    if (result === null) return;
    navigator.clipboard.writeText(result.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClearHistory = () => {
    setHistory([]);
    safeStorage.set(STORAGE_KEY, []);
  };

  const handleReset = () => {
    setStep("idle");
    setResult(null);
    onReset();
  };

  // Thematic colors
  const redPrimary = "#C22A26"; // Shrine Red
  const goldPrimary = "#D4AF37"; // Gold for accents

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full p-6 overflow-hidden">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-105"
        style={{ backgroundImage: `url('${ASSETS.BACKGROUND}')` }}
      >
        <div className="absolute inset-0 bg-[#1A0B0A]/90 backdrop-blur-[4px]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl flex flex-col gap-8 h-full min-h-[80vh]">
        {/* Header Controls */}
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-900/20 hover:bg-red-900/40 border border-red-500/20 hover:border-red-500/40 rounded-2xl text-red-100/50 hover:text-red-100 transition-all text-[11px] font-black uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </motion.button>
          
          <div className="flex flex-col items-center">
            <h2 className="text-red-200/40 text-[10px] font-black uppercase tracking-[0.3em] mb-1">
              Range Settings
            </h2>
            <div className="bg-red-500/10 border border-red-500/20 px-6 py-1.5 rounded-full text-sm font-black text-red-400">
              {min} <span className="mx-2 text-white/20">~</span> {max}
            </div>
          </div>

          <motion.button
            whileHover={{ rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="p-3 bg-red-900/20 hover:bg-red-900/40 border border-red-500/20 hover:border-red-500/40 rounded-2xl text-red-100/50 hover:text-red-100 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Main Animation Area */}
        <div className="flex-1 min-h-[450px] relative flex flex-col items-center justify-center">
          
          <AnimatePresence>
            {/* The Omikuji Cylinder Box */}
            {(step === "idle" || step === "shaking" || step === "dropping") && (
              <motion.div
                key="box"
                className="absolute origin-center"
                initial={{ rotate: 0, y: 0, scale: 1 }}
                animate={
                  step === "shaking" 
                    ? { 
                        rotate: [0, -30, 20, -40, 30, -50, 45, -30, 180], 
                        y: [0, -20, 10, -30, 20, -40, 30, -10, 50],
                        x: [0, -10, 15, -20, 10, -15, 20, 0, 0]
                      } // Chaotic shake, ends upside down
                    : step === "dropping"
                    ? { rotate: 180, y: 50, scale: 1 } // Stay upside down while dropping
                    : { rotate: 0, y: 0, scale: 1 } // Idle
                }
                transition={
                  step === "shaking" 
                    ? { duration: 1.2, ease: "easeInOut", times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1] }
                    : { duration: 0.4, type: "spring" }
                }
                exit={{ opacity: 0, scale: 0.8 }}
                style={{ zIndex: 30 }}
              >
                {/* Visual representation of an Omikuji cylinder (mikuji-zutsu) */}
                <div className="relative w-28 h-56 flex flex-col items-center rounded-sm overflow-hidden" 
                     style={{ 
                         background: "linear-gradient(to right, #8B0000, #C22A26, #8B0000)",
                         boxShadow: "inset -10px 0 20px rgba(0,0,0,0.5), inset 10px 0 20px rgba(0,0,0,0.2), 0 20px 40px rgba(0,0,0,0.8)" 
                     }}>
                  
                  {/* Decorative bands */}
                  <div className="w-full h-2 mt-4" style={{ backgroundColor: goldPrimary }} />
                  <div className="w-full h-1 mt-1" style={{ backgroundColor: goldPrimary }} />
                  
                  {/* Hexagon outline center piece */}
                  <div className="flex-1 flex items-center justify-center w-full">
                    <div className="w-12 h-24 border border-yellow-500/50 flex flex-col items-center justify-center gap-2">
                       <span className="text-yellow-500 font-mincho text-xl font-bold">御</span>
                       <span className="text-yellow-500 font-mincho text-xl font-bold">神</span>
                       <span className="text-yellow-500 font-mincho text-xl font-bold">籤</span>
                    </div>
                  </div>
                  
                  <div className="w-full h-1 mb-1" style={{ backgroundColor: goldPrimary }} />
                  <div className="w-full h-2 mb-4" style={{ backgroundColor: goldPrimary }} />
                  
                  {/* Hole plate (visible when upside down) */}
                  <div className="absolute top-0 w-full h-4 bg-red-950 flex items-center justify-center">
                    <div className="w-4 h-2 bg-black rounded-full" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Dropping Stick (Bou) */}
            {step === "dropping" && (
              <motion.div
                key="stick"
                className="absolute z-20 w-3 h-24 bg-[#D2B48C] rounded-sm"
                style={{
                    boxShadow: "inset -2px 0 4px rgba(0,0,0,0.3)"
                }}
                initial={{ y: -50, scaleY: 0.1, opacity: 0 }}
                animate={{ y: 80, scaleY: 1, opacity: 1, rotate: 10 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                exit={{ scale: 2, opacity: 0, rotate: 45 }}
              />
            )}

            {/* The Paper Slip (Result) */}
            {(step === "revealing" || step === "done") && (
              <motion.div
                key="paper"
                className="omikuji-paper z-40 absolute w-64 md:w-80 p-8 flex flex-col items-center justify-center"
                initial={{ scaleY: 0, scaleX: 0.5, opacity: 0, y: 50, rotate: -5 }}
                animate={{ scaleY: 1, scaleX: 1, opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ originY: 0.5 }}
              >
                {/* Fold creases simulation */}
                <div className="absolute inset-x-0 top-1/3 h-[1px] bg-black/5" />
                <div className="absolute inset-x-0 top-2/3 h-[1px] bg-black/5" />
                <div className="absolute inset-y-0 left-1/2 w-[1px] bg-black/5" />

                <div className="my-10 border-y-2 border-red-800/20 py-12 px-6">
                  {result !== null && (
                     <motion.h1 
                       initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                       animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                       transition={{ delay: 0.5, duration: 0.8 }}
                       className="text-6xl md:text-8xl font-black text-red-950 font-mincho tracking-tighter"
                     >
                       {result}
                     </motion.h1>
                  )}
                  {result === null && <div className="h-24" />}
                </div>

                <div className="w-full flex justify-between mt-8 text-black/60 font-mincho text-sm px-4">
                  <span className="writing-vertical-rl">願望　叶う</span>
                  <span className="writing-vertical-rl">待人　来る</span>
                  <span className="writing-vertical-rl">商法　吉</span>
                  <span className="writing-vertical-rl">学문　安心せよ</span>
                </div>

                {step === "done" && (
                   <motion.button
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     onClick={handleCopy}
                     className="mt-6 flex items-center gap-2 px-4 py-1.5 bg-red-900/5 hover:bg-red-900/10 border border-red-900/10 rounded-full text-[10px] font-bold text-red-900 transition-all"
                   >
                     {copied ? <CheckCircle2 className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                     {copied ? "복사완료!" : "번호 복사"}
                   </motion.button>
                )}
              </motion.div>
            )}

            <motion.div 
              className="absolute pointer-events-none w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full z-0"
              animate={{ 
                  scale: step === "revealing" || step === "done" ? 1.5 : 1,
                  opacity: step === "shaking" ? 0.8 : 0.3
              }}
              transition={{ duration: 1 }}
            />
          </AnimatePresence>

        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02, translateY: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={startDraw}
          disabled={step !== "idle" && step !== "done"}
          className="group relative w-full overflow-hidden p-[2px] rounded-[2.5rem] disabled:opacity-50 disabled:grayscale transition-all shadow-[0_20px_40px_-10px_rgba(194,42,38,0.4)] mt-10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 animate-gradient-x" />
          <div className="relative bg-[#0a0a0c] hover:bg-red-950/40 transition-all rounded-[2.4rem] py-6 flex items-center justify-center gap-4">
            {(step === "shaking" || step === "dropping") ? (
              <div className="w-6 h-6 border-[4px] border-red-500/30 border-t-red-500 rounded-full animate-spin" />
            ) : (
              <Play className="w-6 h-6 fill-current text-red-500 group-hover:text-yellow-500 transition-colors" />
            )}
            <span className={cn(
              "text-xl font-black uppercase tracking-widest transition-colors",
              (step !== "idle" && step !== "done") ? "text-red-100/40" : "text-red-100 group-hover:text-yellow-500"
            )}>
              {(step === "shaking" || step === "dropping") ? "おみくじを引く (SHAKING...)" : "引く (DRAW OMIKUJI)"}
            </span>
          </div>
        </motion.button>

      </div>
    </div>
  );
};

export default OmikujiScreen;
