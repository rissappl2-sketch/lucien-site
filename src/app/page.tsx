"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

/* =====================================================
   GLOBAL SITE CONFIG
===================================================== */

const SITE_MODE: "ACTIVE" | "BLACKOUT" | "COUNTDOWN" = "ACTIVE";
const DROP_DATE = new Date("2026-12-31T18:00:00Z");

/* =====================================================
   MAIN EXPORT
===================================================== */

export default function LucienWebsite() {
  if (SITE_MODE === "BLACKOUT") return <BlackoutMode />;
  if (SITE_MODE === "COUNTDOWN") return <CountdownMode />;
  return <ActiveSeason />;
}

/* =====================================================
   ACTIVE SEASON (Clean Version - No Shopify)
===================================================== */

function ActiveSeason() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center px-6 text-center">
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-semibold tracking-wide mb-8"
      >
        Season Live
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-neutral-400 max-w-xl mb-12"
      >
        The next release is being prepared with precision.
        Product reveal coming soon.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="px-8 py-3 border border-neutral-600 rounded-full text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
      >
        Enter Archive
      </motion.button>

    </div>
  );
}

/* =====================================================
   BLACKOUT MODE
===================================================== */

function BlackoutMode() {
  useEffect(() => {
    let audioContext: AudioContext | null = null;
    let oscillator: OscillatorNode | null = null;
    let gainNode: GainNode | null = null;

    const startAudio = () => {
      if (audioContext) return;

      try {
        audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();

        oscillator = audioContext.createOscillator();
        gainNode = audioContext.createGain();

        oscillator.type = "sine";
        oscillator.frequency.value = 42;

        gainNode.gain.value = 0;

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.start();

        gainNode.gain.linearRampToValueAtTime(
          0.008,
          audioContext.currentTime + 4
        );
      } catch (e) {}
    };

    const handleFirstInteraction = () => {
      startAudio();
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      if (oscillator) oscillator.stop();
      if (audioContext) audioContext.close();
    };
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
      <h1 className="text-6xl text-neutral-400">LUCIEN</h1>
    </div>
  );
}

/* =====================================================
   COUNTDOWN MODE
===================================================== */

function CountdownMode() {
  const [timeLeft, setTimeLeft] = useState(
    DROP_DATE.getTime() - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(DROP_DATE.getTime() - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hasLaunched = timeLeft <= 0;

  const days = Math.max(Math.floor(timeLeft / (1000 * 60 * 60 * 24)), 0);
  const hours = Math.max(Math.floor((timeLeft / (1000 * 60 * 60)) % 24), 0);
  const minutes = Math.max(Math.floor((timeLeft / (1000 * 60)) % 60), 0);
  const seconds = Math.max(Math.floor((timeLeft / 1000) % 60), 0);

  if (hasLaunched) return <ActiveSeason />;

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
      <div className="text-center">
        <Lock className="mx-auto mb-6 h-8 w-8 text-neutral-500" />
        <h1 className="text-3xl md:text-5xl mb-8">Season Approaches</h1>
        <div className="text-3xl">
          {days}d : {hours}h : {minutes}m : {seconds}s
        </div>
      </div>
    </div>
  );
}