"use client";

import { motion } from "framer-motion";

export default function LucienHome() {
  return (
    <div className="relative min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center overflow-hidden px-6 text-center">

      {/* Breathing Light Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.04, 0.08, 0.04],
          scale: [1, 1.08, 1]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(255,255,255,0.15), transparent 60%)"
        }}
      />

      {/* Navigation */}
      <nav className="absolute top-8 left-10 right-10 flex justify-between items-center text-sm tracking-widest">

        <div className="text-lg font-semibold tracking-wider">
          LUCIEN
        </div>

        <div className="flex gap-10 text-neutral-400">
          <a className="hover:text-white transition">Home</a>
          <a className="hover:text-white transition">Shop</a>
          <a className="hover:text-white transition">Track Order</a>
        </div>

      </nav>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-semibold tracking-tight leading-tight"
        >
          Bring{" "}
          <span className="italic text-white">
            Light
          </span>{" "}
          Into Street Culture
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-neutral-400 text-lg"
        >
          Architectural silhouettes. Heavyweight precision. Quiet dominance.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.98 }}
          className="mt-10 px-8 py-3 rounded-full border border-neutral-600 text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-lg"
        >
          Explore Collection
        </motion.button>

      </div>

      <footer className="absolute bottom-8 text-neutral-600 text-sm">
        © 2026 Lucien. Precision in Motion.
      </footer>

    </div>
  );
}
