"use client";

import React, { useState } from "react";
import ModeSelection from "@/components/ModeSelection";
import RangeInput from "@/components/RangeInput";
import DrawScreen from "@/components/DrawScreen";
import { AnimatePresence, motion } from "framer-motion";

type Screen = "mode" | "range" | "draw";
type Mode = "japanese" | "number";

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
    <main className="min-h-screen font-sans selection:bg-orange-500/30">
      <AnimatePresence mode="wait">
        {currentScreen === "mode" && (
          <motion.div
            key="mode"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <ModeSelection onSelect={handleModeSelect} />
          </motion.div>
        )}

        {currentScreen === "range" && (
          <motion.div
            key="range"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full"
          >
            <RangeInput onConfirm={handleRangeConfirm} onBack={handleBack} />
          </motion.div>
        )}

        {currentScreen === "draw" && (
          <motion.div
            key="draw"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="w-full"
          >
            <DrawScreen
              min={range.min}
              max={range.max}
              mode={selectedMode}
              onBack={handleBack}
              onReset={handleReset}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
