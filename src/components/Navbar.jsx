import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Volume2, VolumeX, Menu as MenuIcon, X, Calendar, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAudio } from '../context/AudioContext';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Reserve Menu', path: '/menu' },
  { name: 'Our Story', path: '/story' },
  { name: 'Reservations', path: '/reservations' },
  { name: 'Atelier & Contact', path: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { isPlaying, toggleAmbient } = useAudio();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page navigate
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 transition-all duration-500 py-4 px-4 sm:px-6 md:px-10">
        <nav 
          className={`max-w-7xl mx-auto rounded-full transition-all duration-500 px-6 py-3.5 flex items-center justify-between ${
            isScrolled 
              ? 'glass-panel shadow-2xl shadow-black/60 border border-white/10 backdrop-blur-xl' 
              : 'bg-cafe-darkest/40 backdrop-blur-md border border-white/5'
          }`}
        >
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cafe-mocha via-cafe-bean to-cafe-caramel flex items-center justify-center border border-cafe-gold/40 shadow-inner group-hover:scale-105 transition-transform duration-300">
              <span className="font-serif font-bold text-lg text-cafe-cream group-hover:text-white">A</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif tracking-[0.25em] text-lg font-bold text-cafe-cream group-hover:text-cafe-caramel transition-colors">
                AURA
              </span>
              <span className="text-[9px] tracking-[0.35em] uppercase text-cafe-gold/80 font-light">
                Roastery & Atelier
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/5">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-5 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-300 font-medium ${
                    isActive
                      ? 'text-cafe-darkest font-semibold'
                      : 'text-[#c0b5a8] hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="navPill"
                        className="absolute inset-0 bg-gradient-to-r from-cafe-caramel to-cafe-gold rounded-full shadow-md -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {link.name}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Ambient Sound Button */}
            <button
              onClick={toggleAmbient}
              title={isPlaying ? 'Mute Ambient Sound' : 'Play Cafe Ambiance'}
              className="p-2.5 rounded-full glass-panel border border-white/10 text-cafe-cream hover:text-cafe-caramel hover:border-cafe-caramel/40 transition-all cursor-pointer relative"
            >
              {isPlaying ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-white/50" />
              )}
              {isPlaying && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="group relative p-2.5 rounded-full glass-panel border border-white/10 text-cafe-cream hover:border-cafe-caramel/40 transition-all cursor-pointer"
              title="View Cart"
            >
              <ShoppingBag className="w-4 h-4 text-cafe-cream group-hover:text-cafe-gold transition-colors" />
              {totalItems > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-cafe-caramel text-cafe-darkest font-bold text-[10px] flex items-center justify-center shadow-lg"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* Reserve Table CTA (Desktop) */}
            <Link
              to="/reservations"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cafe-caramel/20 to-cafe-amber/20 hover:from-cafe-caramel hover:to-cafe-amber text-cafe-gold hover:text-cafe-darkest border border-cafe-caramel/40 text-xs tracking-wider uppercase font-semibold transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(217,130,43,0.4)]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Table</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full glass-panel border border-white/10 text-cafe-cream hover:text-cafe-gold transition-all"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-24 z-40 lg:hidden rounded-3xl glass-panel border border-white/15 p-6 shadow-2xl backdrop-blur-2xl bg-[#120d0a]/95 text-center flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `py-3 px-4 rounded-xl text-sm font-medium tracking-wider uppercase transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-cafe-caramel to-cafe-gold text-cafe-darkest font-semibold'
                        : 'text-cafe-cream/80 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <Link
                to="/reservations"
                className="w-full py-3 rounded-full bg-gradient-to-r from-cafe-caramel to-cafe-gold text-cafe-darkest font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book A Tasting Table</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
