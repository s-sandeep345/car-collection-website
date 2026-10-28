import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CarGallery from './components/CarGallery';
import CarDetailsModal from './components/CarDetailsModal';
import CompareView from './pages/CompareView';
import TestDriveModal from './components/TestDriveModal';
import Footer from './components/Footer';
import { CARS_DATA } from './data/cars';
import { Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCar, setSelectedCar] = useState(null);
  const [bookingCar, setBookingCar] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // State arrays for wishlist and compare IDs
  const [wishlist, setWishlist] = useState(['bugatti-chiron']);
  const [compareList, setCompareList] = useState(['bugatti-chiron', 'ferrari-sf90']);

  const handleToggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleToggleCompare = (id) => {
    setCompareList(prev => {
      if (prev.includes(id)) return prev.filter(item => item !== id);
      if (prev.length >= 4) {
        alert('You can compare a maximum of 4 vehicles at a time.');
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleOpenBooking = (car = null) => {
    setBookingCar(car);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      {/* Dynamic Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        wishlistCount={wishlist.length}
        compareCount={compareList.length}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Rendered Views */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <Hero
              onExplore={() => {
                const galleryEl = document.getElementById('gallery');
                if (galleryEl) galleryEl.scrollIntoView({ behavior: 'smooth' });
                else setActiveTab('gallery');
              }}
              onOpenBooking={() => handleOpenBooking()}
            />
            <CarGallery
              onSelectCar={(car) => setSelectedCar(car)}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              compareList={compareList}
              onToggleCompare={handleToggleCompare}
            />
          </>
        )}

        {activeTab === 'gallery' && (
          <div className="pt-16">
            <CarGallery
              onSelectCar={(car) => setSelectedCar(car)}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              compareList={compareList}
              onToggleCompare={handleToggleCompare}
            />
          </div>
        )}

        {activeTab === 'compare' && (
          <CompareView
            compareList={compareList}
            onRemoveCompare={handleToggleCompare}
            onClearCompare={() => setCompareList([])}
          />
        )}

        {activeTab === 'wishlist' && (
          <section className="py-24 px-4 max-w-7xl mx-auto min-h-screen">
            <h1 className="text-3xl font-black mb-8 text-white">YOUR WISHLIST ({wishlist.length})</h1>
            {wishlist.length === 0 ? (
              <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800">
                <Heart className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">Your wishlist is currently empty.</p>
              </div>
            ) : (
              <CarGallery
                onSelectCar={(car) => setSelectedCar(car)}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
                compareList={compareList}
                onToggleCompare={handleToggleCompare}
              />
            )}
          </section>
        )}

        {activeTab === 'about' && (
          <section className="py-24 px-4 max-w-4xl mx-auto space-y-8">
            <div>
              <span className="text-amber-500 text-xs font-bold uppercase tracking-widest">About ApexMotors</span>
              <h1 className="text-4xl font-black text-white mt-1">THE BENCHMARK IN BESPOKE HYPERCARS</h1>
              <p className="text-slate-300 text-sm mt-4 leading-relaxed">
                Founded in 2018, ApexMotors provides high-net-worth enthusiasts and global collectors direct access to off-market hypercars, limited-series roadsters, and verified racing heritage vehicles.
              </p>
            </div>
          </section>
        )}
      </main>

      {/* Global Modals */}
      <CarDetailsModal
        car={selectedCar}
        onClose={() => setSelectedCar(null)}
        onOpenBooking={(car) => handleOpenBooking(car)}
      />

      <TestDriveModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedCar={bookingCar}
      />

      {/* Footer Component */}
      <Footer />
    </div>
  );
}
