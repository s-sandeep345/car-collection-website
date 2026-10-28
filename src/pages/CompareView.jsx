import React from 'react';
import { CARS_DATA } from '../data/cars';
import { Trash2, Scale } from 'lucide-react';

export default function CompareView({ compareList, onRemoveCompare, onClearCompare }) {
  const comparedCars = CARS_DATA.filter(car => compareList.includes(car.id));

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex justify-between items-end mb-10">
        <div>
          <span className="text-amber-500 text-xs font-extrabold uppercase tracking-widest">Head-to-Head</span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mt-2">VEHICLE COMPARISON</h1>
        </div>
        {comparedCars.length > 0 && (
          <button
            onClick={onClearCompare}
            className="px-4 py-2 bg-slate-900 hover:bg-rose-900/40 text-rose-400 text-xs font-bold rounded-xl border border-slate-800 transition"
          >
            Clear All
          </button>
        )}
      </div>

      {comparedCars.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/40 border border-slate-800 rounded-3xl">
          <Scale className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400 font-semibold text-sm">No vehicles added for comparison.</p>
          <p className="text-slate-500 text-xs mt-1">Click the comparison icon on any vehicle card to compare specs side-by-side.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="p-4 bg-slate-900/50 text-slate-400 font-bold uppercase w-48">Spec</th>
                {comparedCars.map(car => (
                  <th key={car.id} className="p-4 bg-slate-900/80 min-w-[240px]">
                    <div className="relative">
                      <img src={car.image} alt={car.name} className="w-full h-32 object-cover rounded-xl mb-2" />
                      <button
                        onClick={() => onRemoveCompare(car.id)}
                        className="absolute top-2 right-2 p-1.5 bg-slate-950/80 text-rose-400 rounded-full"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="font-extrabold text-white text-sm mt-1">{car.name}</p>
                    <p className="text-amber-400 font-bold">{car.formattedPrice}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr>
                <td className="p-4 font-bold text-slate-400">Horsepower</td>
                {comparedCars.map(car => <td key={car.id} className="p-4 font-bold text-white">{car.hp}</td>)}
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400">0-60 Acceleration</td>
                {comparedCars.map(car => <td key={car.id} className="p-4 font-bold text-white">{car.acceleration}</td>)}
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400">Top Speed</td>
                {comparedCars.map(car => <td key={car.id} className="p-4 font-bold text-white">{car.topSpeed}</td>)}
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400">Engine</td>
                {comparedCars.map(car => <td key={car.id} className="p-4 text-slate-300">{car.engine}</td>)}
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400">Transmission</td>
                {comparedCars.map(car => <td key={car.id} className="p-4 text-slate-300">{car.transmission}</td>)}
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400">Drivetrain</td>
                {comparedCars.map(car => <td key={car.id} className="p-4 text-slate-300">{car.drivetrain}</td>)}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
