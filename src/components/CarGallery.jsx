import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Heart, Scale, ArrowUpRight, Zap, Gauge } from 'lucide-react';
import { CARS_DATA, CATEGORIES, BRANDS } from '../data/cars';
import '../styles/CarGallery.css';

export default function CarGallery({ 
  onSelectCar, 
  wishlist, 
  onToggleWishlist, 
  compareList, 
  onToggleCompare 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const filteredCars = useMemo(() => {
    return CARS_DATA.filter((car) => {
      const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            car.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || car.category === selectedCategory;
      const matchesBrand = selectedBrand === 'All' || car.brand === selectedBrand;
      return matchesSearch && matchesCategory && matchesBrand;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'hp') return parseInt(b.hp) - parseInt(a.hp);
      return b.featured ? 1 : -1;
    });
  }, [searchQuery, selectedCategory, selectedBrand, sortBy]);

  return (
    <section id="gallery" className="py-20 bg-slate-950 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-amber-500 font-extrabold text-xs uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
          Curated Showcase
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight">
          EXPLORE THE EXOTIC FLEET
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          Filter through pristine engineering achievements by brand, performance classification, or bespoke styling.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card p-5 rounded-3xl mb-10 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="relative md:col-span-2">
            <Search className="absolute left-4 top-3.5 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by model, brand, or engine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-900/90 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
            />
          </div>

          {/* Brand Filter */}
          <div>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/90 border border-slate-800 rounded-2xl text-xs text-slate-300 focus:outline-none focus:border-amber-500"
            >
              {BRANDS.map((b) => (
                <option key={b} value={b}>{b === 'All' ? 'All Brands' : b}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/90 border border-slate-800 rounded-2xl text-xs text-slate-300 focus:outline-none focus:border-amber-500"
            >
              <option value="featured">Featured First</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
              <option value="hp">Horsepower: Highest</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Car Cards */}
      {filteredCars.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800">
          <p className="text-slate-400 text-sm font-semibold">No vehicles match your criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedBrand('All');
            }}
            className="mt-4 px-4 py-2 bg-amber-500 text-slate-950 text-xs font-bold rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredCars.map((car) => {
              const isWishlisted = wishlist.includes(car.id);
              const isCompared = compareList.includes(car.id);

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={car.id}
                  className="glass-card rounded-3xl overflow-hidden group flex flex-col justify-between"
                >
                  {/* Image Header Container */}
                  <div className="relative h-60 overflow-hidden bg-slate-900">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                    {/* Category Tag */}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-slate-950/80 backdrop-blur-md text-amber-400 text-[10px] uppercase tracking-wider font-extrabold rounded-full border border-amber-500/30">
                      {car.category}
                    </span>

                    {/* Quick Action Badges */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => onToggleWishlist(car.id)}
                        className={`p-2.5 rounded-full backdrop-blur-md border transition ${
                          isWishlisted
                            ? 'bg-rose-600 text-white border-rose-500'
                            : 'bg-slate-950/70 text-slate-300 hover:text-rose-400 border-slate-800'
                        }`}
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                      <button
                        onClick={() => onToggleCompare(car.id)}
                        className={`p-2.5 rounded-full backdrop-blur-md border transition ${
                          isCompared
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : 'bg-slate-950/70 text-slate-300 hover:text-amber-400 border-slate-800'
                        }`}
                      >
                        <Scale className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{car.brand}</span>
                        <span className="text-lg font-black text-amber-400">{car.formattedPrice}</span>
                      </div>
                      <h3 className="text-xl font-extrabold text-white group-hover:text-amber-400 transition">{car.name}</h3>
                      <p className="text-slate-400 text-xs mt-2 line-clamp-2">{car.description}</p>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-2 my-5 p-3 bg-slate-900/80 rounded-2xl border border-slate-800/80 text-xs">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Zap className="w-4 h-4 text-amber-500" />
                        <span>{car.hp}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Gauge className="w-4 h-4 text-amber-500" />
                        <span>{car.acceleration}</span>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <button
                      onClick={() => onSelectCar(car)}
                      className="w-full py-3.5 bg-slate-900 hover:bg-amber-500 text-slate-300 hover:text-slate-950 font-extrabold text-xs rounded-2xl border border-slate-800 hover:border-amber-500 flex items-center justify-center gap-2 transition duration-300"
                    >
                      <span>View Specifications</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
