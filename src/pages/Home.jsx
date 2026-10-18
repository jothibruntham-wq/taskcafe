import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Coffee, Sparkles, Flame, Award, ArrowRight, Heart, Star, 
  Clock, ShieldCheck, Compass, CheckCircle2, ChevronRight 
} from 'lucide-react';
import Cinematic3DHero from '../components/Cinematic3DHero';
import FlavorCompass from '../components/FlavorCompass';
import { useCart } from '../context/CartContext';

// Featured Signature Items
const SIGNATURE_BREWS = [
  {
    id: 'sig-1',
    name: 'Kyoto 18-Hour Slow Drip',
    category: 'Cold Extraction',
    price: 8.5,
    notes: 'Dark chocolate, bourbon oak, black cherry',
    elevation: '2,200m Yirgacheffe',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=700&auto=format&fit=crop&q=80',
    color: '#d9822b'
  },
  {
    id: 'sig-2',
    name: 'Smoked Vanilla Sea Salt Cortado',
    category: 'Espresso Bar',
    price: 6.8,
    notes: 'Smoked Madagascar vanilla, maldon salt, velvet crema',
    elevation: '1,950m Colombian Pink Bourbon',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=700&auto=format&fit=crop&q=80',
    color: '#dfa863'
  },
  {
    id: 'sig-3',
    name: 'Uji Ceremonial Cloud Matcha',
    category: 'Artisanal Tea',
    price: 8.0,
    notes: 'First-harvest Tencha, oat cloud foam, golden honey',
    elevation: 'Kyoto Shaded Estate',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=700&auto=format&fit=crop&q=80',
    color: '#39604b'
  },
  {
    id: 'sig-4',
    name: 'Honey Caramel Croissant Supreme',
    category: 'Artisan Pastry',
    price: 7.2,
    notes: 'French Isigny butter, wild lavender honey, caramelized almonds',
    elevation: 'Baked Hourly at Atelier',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=700&auto=format&fit=crop&q=80',
    color: '#c85a32'
  }
];

// Brewing Methods
const BREW_METHODS = [
  {
    name: 'Syphon Vacuum Glass',
    temp: '93.5°C',
    time: '2m 15s',
    desc: 'Vapor pressure extraction yielding the cleanest, most tea-like crystalline cup with heightened floral nuances.',
    icon: Flame,
  },
  {
    name: 'Pour Over V60 Ceramic',
    temp: '91.0°C',
    time: '3m 00s',
    desc: 'Spiral continuous water turbulence through Japanese unbleached fiber filters for brilliant crisp fruit acidity.',
    icon: Compass,
  },
  {
    name: 'Custom Lever Espresso',
    temp: '94.0°C',
    time: '28s @ 9 Bar',
    desc: 'Spring-loaded piston pressure curve creating thick syrupy crema, dark cacao depth, and velvety body.',
    icon: Coffee,
  },
  {
    name: 'Cold Nitrogen Tap',
    temp: '2.0°C',
    time: 'Micro-Bubbled',
    desc: 'Infused with food-grade pure nitrogen for a Guinness-like cascading waterfall head and natural butteriness.',
    icon: Sparkles,
  }
];

// Testimonials
const REVIEWS = [
  {
    quote: "A transformative sensory experience. The Kyoto Slow Drip tasted like melted dark chocolate steeped in rare orchids.",
    author: "Elena Rostova",
    title: "Culinary Critic, Metropolitan Journal",
    rating: 5
  },
  {
    quote: "The architecture, the ambient acoustics, and the kinetic coffee bars make AURA the pinnacle of modern cafe culture in the city.",
    author: "Marcus Chen",
    title: "Architect & Specialty Coffee Q-Grader",
    rating: 5
  },
  {
    quote: "No bitter aftertaste whatsoever. Pure, velvety, and roasted to absolute perfection. Their Uji Cloud Matcha is unmatched.",
    author: "Sora Takahashi",
    title: "Tea Master & Designer",
    rating: 5
  }
];

export default function Home() {
  const containerRef = useRef(null);
  const { addToCart } = useCart();
  const [activeMethod, setActiveMethod] = useState(0);

  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const parallaxBg1 = useTransform(scrollYProgress, [0, 0.4], [0, -120]);
  const parallaxBg2 = useTransform(scrollYProgress, [0.3, 0.7], [60, -80]);
  const parallaxRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      {/* 1. CINEMATIC 3D HERO */}
      <Cinematic3DHero />

      {/* 2. CHAPTER 1: OBSIDIAN ROAST PHILOSOPHY (Deep Roast Theme) */}
      <section className="relative py-28 md:py-36 px-6 md:px-12 bg-gradient-to-b from-[#0b0806] via-[#120c09] to-[#18100b] text-cafe-cream">
        <motion.div 
          style={{ y: parallaxBg1 }} 
          className="absolute -top-24 right-10 w-96 h-96 rounded-full bg-cafe-caramel/10 blur-[130px] pointer-events-none"
        />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-cafe-caramel/30 text-xs tracking-[0.25em] uppercase text-cafe-gold">
                <Sparkles className="w-3.5 h-3.5 text-cafe-caramel" />
                <span>Chapter I : The Philosophy</span>
              </div>

              <h2 className="font-serif text-4xl md:text-6xl font-normal leading-[1.15] text-cafe-cream">
                We don’t just brew coffee. We sculpt <span className="italic text-cafe-caramel">moments in time.</span>
              </h2>

              <p className="text-base text-[#b9aba0] font-light leading-relaxed">
                Founded on the belief that a cup of coffee is an intimate ritual, AURA bridges ancient highland harvesting traditions with cutting-edge kinetic thermodynamics. Every bean is sourced through direct-trade relationships with micro-lot farmers in Ethiopia, Colombia, and Yemen.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
                <div>
                  <h4 className="font-serif text-3xl font-bold text-cafe-gold">2,140m</h4>
                  <p className="text-xs text-[#a39487] tracking-wider uppercase mt-1">Highland Terroir</p>
                </div>
                <div>
                  <h4 className="font-serif text-3xl font-bold text-cafe-gold">100%</h4>
                  <p className="text-xs text-[#a39487] tracking-wider uppercase mt-1">Directly Traded</p>
                </div>
                <div>
                  <h4 className="font-serif text-3xl font-bold text-cafe-gold">88.5+</h4>
                  <p className="text-xs text-[#a39487] tracking-wider uppercase mt-1">SCA Cupping Score</p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/story"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cafe-gold hover:text-white group font-medium"
                >
                  <span>Explore The Full Harvest Journey</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Right Visual Collage with Parallax */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 aspect-[4/5] shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=900&auto=format&fit=crop&q=80"
                  alt="Artisanal Roaster Atelier"
                  className="w-full h-full object-cover brightness-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-panel border border-white/10">
                  <span className="text-[10px] uppercase tracking-widest text-cafe-gold font-mono">The Heritage Roaster</span>
                  <p className="text-sm font-serif text-cafe-cream mt-0.5">Custom Cast Iron Drum Roaster — Modulating airflow to 0.1°C precision</p>
                </div>
              </motion.div>

              {/* Floating Parallax Stamp */}
              <motion.div
                style={{ rotate: parallaxRotate }}
                className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full border border-cafe-caramel/40 bg-cafe-darkest/90 backdrop-blur-md flex items-center justify-center text-center p-2 shadow-xl shadow-black/80 hidden sm:flex"
              >
                <span className="text-[9px] tracking-widest uppercase font-mono text-cafe-gold">
                  PURE • MICRO • LOT
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CHAPTER 2: AMBER CARAMEL SIGNATURE BREWS (Warm Amber Theme) */}
      <section className="relative py-28 md:py-36 px-6 md:px-12 bg-gradient-to-b from-[#18100b] via-[#24160e] to-[#1c120c] text-cafe-cream">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-cafe-caramel/30 text-xs tracking-[0.25em] uppercase text-cafe-gold mb-4">
                <Sparkles className="w-3.5 h-3.5 text-cafe-caramel" />
                <span>Chapter II : Reserve Creations</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-normal text-cafe-cream">
                Signature Seasonal Extractions
              </h2>
            </div>
            <Link
              to="/menu"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass-panel border border-white/10 text-xs uppercase tracking-wider text-cafe-gold hover:border-cafe-caramel transition-all"
            >
              <span>View Complete 24-Item Menu</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 3D Tilt Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SIGNATURE_BREWS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative rounded-3xl glass-panel border border-white/10 overflow-hidden flex flex-col justify-between hover:border-cafe-caramel/50 transition-all duration-300 shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140e0a] via-transparent to-transparent opacity-80" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] tracking-widest uppercase text-cafe-gold border border-white/10 font-mono">
                    {item.category}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-cafe-cream group-hover:text-cafe-gold transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#a99a8d] mt-2 line-clamp-2 font-light">
                      {item.notes}
                    </p>
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-cafe-caramel mt-2">
                      {item.elevation}
                    </span>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="font-serif text-xl font-semibold text-cafe-cream">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(item, { milk: 'Whole Milk' })}
                      className="px-4 py-2 rounded-full bg-cafe-caramel hover:bg-cafe-amber text-cafe-darkest font-semibold text-xs uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-cafe-caramel/30 active:scale-95 cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Add</span>
                      <Coffee className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CHAPTER 3: BOTANICAL MATCHA & TEA LOUNGE (Forest Matcha Green Palette Shift!) */}
      <section className="relative py-28 md:py-36 px-6 md:px-12 bg-gradient-to-b from-[#15231b] via-[#101c15] to-[#0c1611] text-[#e8f1eb]">
        {/* Glow orb */}
        <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-[#39604b]/20 blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Visual preview */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <div className="rounded-3xl overflow-hidden border border-emerald-500/20 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=900&auto=format&fit=crop&q=80"
                  alt="Uji Kyoto Matcha Whisking Ceremony"
                  className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-6 right-6 p-5 rounded-2xl glass-panel border border-emerald-500/30 bg-[#0e1913]/90 backdrop-blur-xl max-w-xs shadow-2xl">
                <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400">Ceremonial Grade Tencha</span>
                <p className="text-xs text-[#c2d6ca] mt-1 font-light">Whisked with traditional 100-prong bamboo chasen for dense velvet micro-foam.</p>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-xs tracking-[0.25em] uppercase text-emerald-300">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Chapter III : The Jade Sanctuary</span>
              </div>

              <h2 className="font-serif text-4xl md:text-5xl font-normal leading-[1.15] text-[#f0f7f3]">
                Single-Estate Ceremonial Matcha from the mists of <span className="italic text-emerald-400">Kyoto.</span>
              </h2>

              <p className="text-base text-[#b0c8b9] font-light leading-relaxed">
                Step into a serene balance of pure L-theanine energy and creamy vegetal sweetness. Shaded under reed screens for 30 days before harvest to concentrate chlorophyll and amino acids, then stone-ground into an ethereal emerald powder.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-[#d4e4db]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Harvested during the First Flush (Ichibancha)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#d4e4db]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Slow stone-ground at 30 grams per hour</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#d4e4db]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Paired with organic oat milk or mineral spring water</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/menu"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-black font-semibold text-xs uppercase tracking-widest inline-flex items-center gap-2 shadow-lg shadow-emerald-950/40"
                >
                  <span>Explore Matcha & Teas</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE FLAVOR COMPASS */}
      <section id="roast-compass" className="relative py-28 md:py-36 px-6 md:px-12 bg-gradient-to-b from-[#0c1611] via-[#140e0b] to-[#120d0a]">
        <FlavorCompass />
      </section>

      {/* 6. CHAPTER 4: KINETIC BARISTA SHOWCASE & BREW LAB */}
      <section className="relative py-28 md:py-36 px-6 md:px-12 bg-gradient-to-b from-[#120d0a] via-[#1a120c] to-[#130d0a] text-cafe-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-cafe-caramel/30 text-xs tracking-[0.25em] uppercase text-cafe-gold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-cafe-caramel" />
              <span>Chapter IV : The Laboratory</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-normal text-cafe-cream mb-4">
              Four Kinetic Extraction Disciplines
            </h2>
            <p className="text-sm text-[#b0a192] font-light leading-relaxed">
              Every bean requires a specific pressure gradient and thermodynamic profile. Choose an extraction method to examine its calibration.
            </p>
          </div>

          {/* Brew Method Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {BREW_METHODS.map((m, idx) => {
              const active = activeMethod === idx;
              return (
                <button
                  key={m.name}
                  onClick={() => setActiveMethod(idx)}
                  className={`p-5 rounded-2xl text-left border transition-all duration-300 ${
                    active
                      ? 'bg-cafe-caramel/20 border-cafe-caramel text-cafe-gold shadow-lg shadow-cafe-caramel/10'
                      : 'glass-panel border-white/5 text-[#9e9082] hover:border-white/20'
                  }`}
                >
                  <m.icon className={`w-5 h-5 mb-3 ${active ? 'text-cafe-gold' : 'text-white/40'}`} />
                  <h4 className="font-serif text-base text-cafe-cream font-medium">{m.name}</h4>
                  <p className="text-[11px] font-mono text-[#a39487] mt-1">{m.temp}</p>
                </button>
              );
            })}
          </div>

          {/* Active Method Detail Card */}
          <motion.div
            key={activeMethod}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 md:p-12 rounded-3xl glass-panel border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="space-y-4 max-w-2xl">
              <span className="text-xs uppercase tracking-widest text-cafe-gold font-mono">
                Extraction Protocol • {BREW_METHODS[activeMethod].name}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-cafe-cream">
                Engineered for maximum soluble clarity.
              </h3>
              <p className="text-sm text-[#b9aba0] font-light leading-relaxed">
                {BREW_METHODS[activeMethod].desc}
              </p>
              <div className="flex items-center gap-6 text-xs font-mono text-cafe-gold pt-2">
                <span>Target Temp: {BREW_METHODS[activeMethod].temp}</span>
                <span>•</span>
                <span>Contact Duration: {BREW_METHODS[activeMethod].time}</span>
              </div>
            </div>

            <Link
              to="/reservations"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cafe-caramel to-cafe-gold text-cafe-darkest font-semibold text-xs uppercase tracking-wider whitespace-nowrap hover:shadow-lg transition-all"
            >
              Book Tasting Experience
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIALS & REVIEWS */}
      <section className="relative py-28 px-6 md:px-12 bg-gradient-to-b from-[#130d0a] to-[#0c0806] text-cafe-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-cafe-cream font-normal">
              Words From The Connoisseurs
            </h2>
            <p className="text-xs uppercase tracking-widest text-cafe-gold font-mono mt-2">
              Over 2,400+ Verified 5-Star Reviews
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((rev, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="p-8 rounded-3xl glass-panel border border-white/10 flex flex-col justify-between hover:border-cafe-caramel/40 transition-all"
              >
                <div>
                  <div className="flex items-center gap-1 text-cafe-gold mb-6">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-cafe-gold text-cafe-gold" />
                    ))}
                  </div>
                  <p className="font-serif text-base italic text-[#cfc2b5] leading-relaxed mb-6">
                    "{rev.quote}"
                  </p>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <h4 className="font-serif text-sm font-semibold text-cafe-cream">{rev.author}</h4>
                  <p className="text-[11px] text-[#9a8c80] font-light">{rev.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. RESERVATION CALL TO ACTION */}
      <section className="relative py-24 px-6 md:px-12 bg-gradient-to-r from-cafe-caramel/20 via-cafe-mocha/30 to-cafe-darkest border-t border-b border-white/10">
        <div className="max-w-5xl mx-auto rounded-3xl p-10 md:p-16 text-center glass-panel border border-cafe-caramel/30 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cafe-caramel/15 rounded-full blur-[100px] pointer-events-none" />
          
          <h2 className="font-serif text-4xl md:text-5xl text-cafe-cream font-normal mb-4">
            An Unforgettable Tasting Awaits You
          </h2>
          <p className="text-sm text-[#c0b1a2] max-w-xl mx-auto font-light leading-relaxed mb-8">
            Reserve a counter seat at our marble extraction bar, cozy fireplace nook, or greenhouse patio.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/reservations"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cafe-caramel to-cafe-gold text-cafe-darkest font-semibold text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-cafe-caramel/30"
            >
              Book Tasting Table Now
            </Link>
            <Link
              to="/menu"
              className="px-8 py-3.5 rounded-full glass-panel border border-white/15 text-cafe-cream text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              Order Ahead For Pickup
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
