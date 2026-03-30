"use client";

import React, { useState } from "react";
import ModeSelection from "@/components/ModeSelection";
import RangeInput from "@/components/RangeInput";
import DrawScreen from "@/components/DrawScreen";
import OmikujiScreen from "@/components/OmikujiScreen";
import { AnimatePresence, motion } from "framer-motion";

type Screen = "mode" | "range" | "draw";
type Mode = "japanese" | "number" | "omikuji";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("mode");
  const [selectedMode, setSelectedMode] = useState<Mode>("japanese");
  const [range, setRange] = useState<{ min: number; max: number }>({ min: 1, max: 100 });

  const handleModeSelect = (mode: Mode) => {
    setSelectedMode(mode);
    setCurrentScreen("range");
  };

  const handleRangeConfirm = (min: number, max: number) => {
    setRange({ min, max });
    setCurrentScreen("draw");
  };

  const handleBack = () => {
    if (currentScreen === "range") setCurrentScreen("mode");
    if (currentScreen === "draw") setCurrentScreen("range");
  };

  const handleReset = () => {
    setCurrentScreen("mode");
    setRange({ min: 1, max: 100 });
  };

  return (
    <main className="min-h-screen font-sans selection:bg-orange-500/30 overflow-hidden bg-[#0a0a0c]">
      {/* Global Background (Persistent across screens) */}
      <div className="aurora-container pointer-events-none">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
      </div>

      <AnimatePresence mode="wait">
        {currentScreen === "mode" && (
          <motion.div
            key="mode"
            initial={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <ModeSelection onSelect={handleModeSelect} />
          </motion.div>
        )}

        {currentScreen === "range" && (
          <motion.div
            key="range"
            initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -40, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full"
          >
            <RangeInput onConfirm={handleRangeConfirm} onBack={handleBack} />
          </motion.div>
        )}

        {currentScreen === "draw" && selectedMode !== "omikuji" && (
          <motion.div
            key="draw"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <DrawScreen
              min={range.min}
              max={range.max}
              mode={selectedMode as "japanese" | "number"}
              onBack={handleBack}
              onReset={handleReset}
            />
          </motion.div>
        )}

        {currentScreen === "draw" && selectedMode === "omikuji" && (
          <motion.div
            key="omikuji"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <OmikujiScreen
              min={range.min}
              max={range.max}
              onBack={handleBack}
              onReset={handleReset}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
