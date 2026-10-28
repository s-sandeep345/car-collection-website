import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, Zap, Gauge, Shield, Cpu, PhoneCall } from 'lucide-react';
import '../styles/CarGallery.css';

export default function CarDetailsModal({ car, onClose, onOpenBooking }) {
  const [activeImage, setActiveImage] = useState(car?.image);

  if (!car) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass-card w-full max-w-4xl rounded-3xl overflow-hidden border border-slate-800 my-8 max-h-[90vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <div>
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">{car.category}</span>
            <h2 className="text-2xl font-black text-white mt-0.5">{car.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Scrollable */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          {/* Main Image and Gallery Thumbnails */}
          <div>
            <div className="h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-900 mb-3 border border-slate-800">
              <img
                src={activeImage || car.image}
                alt={car.name}
                className="w-full h-full object-cover"
              />
            </div>
            {car.gallery && car.gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {car.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-24 h-16 rounded-xl border-2 overflow-hidden flex-shrink-0 transition ${
                      activeImage === img ? 'border-amber-500 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Detailed Specifications Grid */}
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-400 mb-4">Technical Specifications</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
                  <Zap className="w-4 h-4" /> Power
                </div>
                <p className="text-lg font-black text-white">{car.hp}</p>
              </div>

              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
                  <Gauge className="w-4 h-4" /> Acceleration
                </div>
                <p className="text-lg font-black text-white">{car.acceleration}</p>
              </div>

              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
                  <Cpu className="w-4 h-4" /> Top Speed
                </div>
                <p className="text-lg font-black text-white">{car.topSpeed}</p>
              </div>

              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
                  <Shield className="w-4 h-4" /> Drivetrain
                </div>
                <p className="text-lg font-black text-white">{car.drivetrain}</p>
              </div>
            </div>
          </div>

          {/* Description & Warranty Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">Vehicle Overview</h4>
              <p className="text-slate-300 text-xs leading-relaxed">{car.description}</p>
            </div>
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">Bespoke Features</h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-amber-400" /> Full Manufacturer Warranty</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-amber-400" /> Certified 150-Point Inspection</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-amber-400" /> Worldwide Enclosed Transport</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/80 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Estimated Pricing</span>
            <span className="text-2xl font-black text-amber-400">{car.formattedPrice}</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenBooking(car);
            }}
            className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Request Private Demo & Test Drive</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
