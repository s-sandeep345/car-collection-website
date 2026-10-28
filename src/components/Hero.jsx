import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Flame, Gauge, Zap } from 'lucide-react';
import '../styles/Hero.css';

export default function Hero({ onExplore, onOpenBooking }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-slate-950">
      {/* Background Hero Image with Dark Gradient Mask */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=2000&q=90"
          alt="Luxury Supercar"
          className="w-full h-full object-cover object-center scale-105 animate-pulse transition duration-1000 opacity-40"
        />
        <div className="absolute inset-0 hero-gradient-overlay" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12">
        {/* Top Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest backdrop-blur-md mb-6"
        >
          <Flame className="w-4 h-4 text-amber-500 animate-bounce" />
          <span>The World's Most Elite Collection</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] max-w-5xl mx-auto"
        >
          EXPERIENCE THE UNTAMED <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">PINNACLE OF AUTOMOTIVE</span> EXCELLENCE
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Curated hypercars, bespoke supercars, and ultra-luxurious grand tourers. Delivered with white-glove service and uncompromised craftsmanship.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onExplore}
            className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm rounded-2xl shadow-xl shadow-amber-500/25 flex items-center justify-center gap-3 transition transform hover:-translate-y-0.5"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>

          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900/80 hover:bg-slate-800 text-white font-bold text-sm rounded-2xl border border-slate-700/80 backdrop-blur-md transition"
          >
            Book Private Consultation
          </button>
        </motion.div>

        {/* Stat Highlights Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto p-4 bg-slate-900/60 border border-slate-800/80 rounded-3xl backdrop-blur-md"
        >
          <div className="p-3 text-center border-r border-slate-800/80 last:border-none">
            <div className="flex justify-center text-amber-400 mb-1"><Zap className="w-5 h-5" /></div>
            <p className="text-xl sm:text-2xl font-black text-white">1,500+ HP</p>
            <p className="text-[11px] text-slate-400 uppercase font-semibold">Peak Power Output</p>
          </div>
          <div className="p-3 text-center border-r border-slate-800/80 last:border-none">
            <div className="flex justify-center text-amber-400 mb-1"><Gauge className="w-5 h-5" /></div>
            <p className="text-xl sm:text-2xl font-black text-white">273 MPH</p>
            <p className="text-[11px] text-slate-400 uppercase font-semibold">Max Top Speed</p>
          </div>
          <div className="p-3 text-center border-r border-slate-800/80 last:border-none">
            <div className="flex justify-center text-amber-400 mb-1"><ShieldCheck className="w-5 h-5" /></div>
            <p className="text-xl sm:text-2xl font-black text-white">100% Verified</p>
            <p className="text-[11px] text-slate-400 uppercase font-semibold">Provenance & Inspection</p>
          </div>
          <div className="p-3 text-center">
            <div className="flex justify-center text-amber-400 mb-1"><Flame className="w-5 h-5" /></div>
            <p className="text-xl sm:text-2xl font-black text-white">50+ Exotics</p>
            <p className="text-[11px] text-slate-400 uppercase font-semibold">In Global Showrooms</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
