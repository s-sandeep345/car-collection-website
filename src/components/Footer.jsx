import React from 'react';
import { Car, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-xs text-slate-400">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950">
              <Car className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-lg font-black text-white">APEX<span className="text-amber-500">MOTORS</span></span>
          </div>
          <p className="leading-relaxed">
            Global luxury and hypercar boutique specializing in curated automotive masterpieces, private sales, and white-glove delivery.
          </p>
        </div>

        <div>
          <h4 className="font-extrabold text-white uppercase tracking-wider mb-4">Showroom Locations</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-500" /> Beverly Hills, CA</li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-500" /> Monaco, Monte Carlo</li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-500" /> Dubai, UAE</li>
          </ul>
        </div>

        <div>
          <h4 className="font-extrabold text-white uppercase tracking-wider mb-4">Concierge Support</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-amber-500" /> +1 (800) 555-APEX</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-amber-500" /> concierge@apexmotors.com</li>
          </ul>
        </div>

        <div>
          <h4 className="font-extrabold text-white uppercase tracking-wider mb-4">Private Newsletter</h4>
          <p className="mb-3">Receive off-market allocation alerts directly.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter email..."
              className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white w-full focus:outline-none focus:border-amber-500"
            />
            <button className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl">Join</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-900 text-center text-[11px] text-slate-600">
        © {new Date().getFullYear()} ApexMotors Inc. All rights reserved. Custom Automotive Design System.
      </div>
    </footer>
  );
}
