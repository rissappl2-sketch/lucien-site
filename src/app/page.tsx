"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

/* =====================================================
   GLOBAL SITE CONFIG
===================================================== */

// Change this manually per season phase:
// "ACTIVE" | "BLACKOUT" | "COUNTDOWN"
const SITE_MODE: "ACTIVE" | "BLACKOUT" | "COUNTDOWN" = "COUNTDOWN";

// Set your next drop date here
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.8, ease: "easeOut" }}
      className="relative min-h-screen bg-neutral-950 overflow-hidden flex items-center justify-center"
    >
      {/* Ambient Drift */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.035, 0.06, 0.035],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.08), transparent 65%)",
        }}
      />

      {/* Slow Light Sweep */}
      <motion.div
        className="absolute inset-0"
        animate={{ x: ["-10%", "10%", "-10%"] }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)",
          opacity: 0.25,
        }}
      />

      {/* Grain Texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"200\"><filter id=\"noise\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23noise)\" opacity=\"0.4\"/></svg>')",
          opacity: 0.03,
          mixBlendMode: "overlay",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.94, 1, 0.94] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          }}
          className="text-6xl md:text-7xl font-semibold tracking-tight text-neutral-400"
        >
          LUCIEN
        </motion.h1>

        <p className="mt-6 text-sm tracking-widest text-neutral-600 uppercase">
          Season Closed
        </p>
      </div>
    </motion.div>
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
    <div className="relative min-h-screen bg-neutral-950 text-white overflow-hidden flex items-center justify-center">
      <div className="text-center">
        <Lock className="mx-auto mb-6 h-8 w-8 text-neutral-500" />

        <h1 className="text-3xl md:text-5xl font-semibold tracking-wide mb-8">
          Season Approaches
        </h1>

        <div className="text-3xl md:text-4xl tracking-widest mb-6">
          {days}d : {hours}h : {minutes}m : {seconds}s
        </div>

        <p className="text-neutral-500 text-sm tracking-wider uppercase">
          Precision in motion
        </p>
      </div>
    </div>
  );
}

/* =====================================================
   ACTIVE SEASON
===================================================== */

function ActiveSeason() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
      <motion.h1
        initial={{ letterSpacing: "0em", opacity: 0 }}
        animate={{ letterSpacing: "0.05em", opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-5xl md:text-7xl font-semibold tracking-tight text-neutral-300"
      >
        Bring{" "}
        <span className="italic tracking-wide text-white">Light</span> Into
        Street Culture
      </motion.h1>
    </div>
  );
}