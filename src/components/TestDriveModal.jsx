import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

export default function TestDriveModal({ isOpen, onClose, selectedCar }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    location: 'Beverly Hills Showroom',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-card w-full max-w-lg rounded-3xl p-6 border border-slate-800 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-slate-900 text-slate-400 hover:text-white rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-10 space-y-3">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h3 className="text-xl font-black text-white">Consultation Requested</h3>
            <p className="text-slate-300 text-xs max-w-xs mx-auto">
              Our bespoke concierge team will contact you within 2 hours to confirm your private viewing.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-amber-500 text-[10px] font-extrabold uppercase tracking-widest">Private VIP Access</span>
              <h2 className="text-xl font-black text-white mt-1">Book A Test Drive</h2>
              {selectedCar && (
                <p className="text-xs text-amber-400 font-semibold mt-0.5">Vehicle: {selectedCar.name}</p>
              )}
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Lord Sterling"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="sterling@apex.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Phone Number</label>
                  <input
                    required
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Preferred Date</label>
                <input
                  required
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition mt-2"
            >
              Confirm Reservation
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
