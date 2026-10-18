import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Flame, Droplets, Wind, Sparkles, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const FLAVOR_PROFILES = [
  {
    id: 'ethiopian-floral',
    name: 'Ethiopia Yirgacheffe G1',
    notes: 'Jasmine, Bergamot, Candied Lemon',
    roastLevel: 'Light City',
    description: 'Delicate floral tea-like body with vibrant citrus acidity harvested at 2,150 meters.',
    stats: { sweetness: 85, acidity: 94, body: 62, aroma: 98, finish: 88 },
    color: '#dfa863',
    price: 8.5,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'colombia-geisha',
    name: 'Colombia Huila Pink Bourbon',
    notes: 'Ripe Papaya, Blood Orange, Honeycomb',
    roastLevel: 'Medium-Light',
    description: 'Anaerobic slow fermentation creating a silky tropical nectar mouthfeel.',
    stats: { sweetness: 96, acidity: 82, body: 78, aroma: 92, finish: 95 },
    color: '#d9822b',
    price: 9.0,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'sumatra-mandheling',
    name: 'Sumatra Mandheling Triple-Pick',
    notes: 'Dark Dark Cocoa, Cedar, Tobacco Leaf',
    roastLevel: 'Full City (Dark)',
    description: 'Wet-hulled Giling Basah method offering colossal creamy body and deep earthy sweetness.',
    stats: { sweetness: 74, acidity: 45, body: 98, aroma: 86, finish: 92 },
    color: '#8b5a2b',
    price: 7.5,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'matcha-ceremonial',
    name: 'Uji Ceremonial Single-Estate Matcha',
    notes: 'Stone Ground Tencha, Umami, Sweet Cream',
    roastLevel: 'First Harvest Spring',
    description: 'Shaded for 30 days in Kyoto, stone-ground into vibrant jade velvet froth.',
    stats: { sweetness: 80, acidity: 30, body: 88, aroma: 95, finish: 96 },
    color: '#39604b',
    price: 8.0,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop&q=80',
  },
];

export default function FlavorCompass() {
  const [selectedProfile, setSelectedProfile] = useState(FLAVOR_PROFILES[0]);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(selectedProfile, { milk: 'Single-Origin Reserve' });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto rounded-3xl glass-panel border border-white/10 p-6 md:p-12 overflow-hidden relative">
      {/* Background ambient gradient tied to active profile color */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: selectedProfile.color }}
      />

      <div className="flex flex-col lg:flex-row gap-10 items-center justify-between relative z-10">
        {/* Left selector */}
        <div className="w-full lg:w-1/2 flex flex-col items-start">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-cafe-gold mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Roaster Compass</span>
          </div>

          <h3 className="font-serif text-3xl md:text-4xl text-cafe-cream mb-4 font-normal">
            Discover Your Sensory Frequency
          </h3>
          <p className="text-sm text-[#b6a798] font-light leading-relaxed mb-8">
            Every harvest carries a distinct botanical footprint. Select a flavor profile to explore bean extraction metrics and tasting notes calibrated by our Q-graders.
          </p>

          {/* Profile Selector Buttons */}
          <div className="grid grid-cols-2 gap-3 w-full mb-8">
            {FLAVOR_PROFILES.map((p) => {
              const active = selectedProfile.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedProfile(p)}
                  className={`p-4 rounded-2xl text-left border transition-all duration-300 ${
                    active
                      ? 'bg-white/10 border-cafe-caramel shadow-lg shadow-black/40 scale-[1.02]'
                      : 'bg-white/[0.03] border-white/5 hover:border-white/20 hover:bg-white/5 text-[#9e9082]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span 
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: p.color }}
                    />
                    <span className="text-[10px] tracking-widest uppercase font-mono text-[#ad9f92]">
                      {p.roastLevel}
                    </span>
                  </div>
                  <h4 className={`text-sm font-serif ${active ? 'text-cafe-cream font-medium' : 'text-[#d6c9bc]'}`}>
                    {p.name.split(' ')[0]} {p.name.split(' ')[1]}
                  </h4>
                  <p className="text-[11px] text-[#a49587] truncate mt-0.5">{p.notes}</p>
                </button>
              );
            })}
          </div>

          {/* Add to order action */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleAdd}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-cafe-caramel to-cafe-gold text-cafe-darkest font-semibold text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-md flex items-center gap-2 cursor-pointer"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 text-emerald-950" />
                  <span>Added to Tasting Order</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Brew This Roast (${selectedProfile.price.toFixed(2)})</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Radar / Bar Visualizer */}
        <div className="w-full lg:w-5/12 bg-black/40 p-6 md:p-8 rounded-3xl border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={selectedProfile.image}
              alt={selectedProfile.name}
              className="w-16 h-16 rounded-2xl object-cover border border-white/15"
            />
            <div>
              <span className="text-[10px] tracking-widest uppercase text-cafe-gold font-mono">
                Featured Selection
              </span>
              <h4 className="font-serif text-lg text-cafe-cream font-medium">{selectedProfile.name}</h4>
              <p className="text-xs text-[#a59687]">{selectedProfile.notes}</p>
            </div>
          </div>

          <p className="text-xs text-[#c4b5a6] font-light leading-relaxed mb-6 border-b border-white/10 pb-4">
            "{selectedProfile.description}"
          </p>

          {/* Flavor Bar Meters */}
          <div className="space-y-3.5">
            {Object.entries(selectedProfile.stats).map(([key, val]) => (
              <div key={key}>
                <div className="flex justify-between text-xs tracking-wider uppercase font-light text-[#b8ab9e] mb-1">
                  <span className="capitalize">{key}</span>
                  <span className="font-mono text-cafe-gold">{val}%</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: selectedProfile.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${val}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
