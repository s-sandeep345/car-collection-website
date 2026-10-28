import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Heart, Scale, Menu, X, PhoneCall } from 'lucide-react';
import '../styles/Header.css';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  wishlistCount, 
  compareCount, 
  onOpenBooking 
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'gallery', label: 'Car Collection' },
    { id: 'brands', label: 'Brands & Types' },
    { id: 'compare', label: `Comparison (${compareCount})` },
    { id: 'wishlist', label: `Wishlist (${wishlistCount})` },
    { id: 'about', label: 'About & FAQ' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-slate-950/90 header-blur border-b border-slate-800/80 py-3.5 shadow-xl' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition">
            <Car className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-amber-400 transition">APEX<span className="text-amber-500">MOTORS</span></span>
            <span className="block text-[9px] uppercase tracking-widest text-slate-400 font-medium">Bespoke Automotive</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/60">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-4 py-2 text-xs font-semibold rounded-xl transition duration-200 ${
                  isActive ? 'text-slate-950 font-bold' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl shadow-md"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('wishlist')}
            className="relative p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-amber-400 rounded-xl transition"
            title="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-500 text-slate-950 text-[10px] font-extrabold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          <button 
            onClick={() => setActiveTab('compare')}
            className="relative p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-amber-400 rounded-xl transition"
            title="Compare Vehicles"
          >
            <Scale className="w-4 h-4" />
            {compareCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-500 text-slate-950 text-[10px] font-extrabold rounded-full flex items-center justify-center">
                {compareCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onOpenBooking()}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Book Test Drive</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-xl"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-950/95 border-b border-slate-800 header-blur px-4 pt-4 pb-6 space-y-2 mt-2"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  activeTab === item.id ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenBooking();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 text-slate-950 font-bold text-sm rounded-xl"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Book Test Drive</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
