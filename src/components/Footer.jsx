import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Mail, MapPin, Clock, Phone, Music, Heart, CheckCircle2 } from 'lucide-react';

const Instagram = ({ className = "w-4 h-4", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Twitter = ({ className = "w-4 h-4", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#0e0907] via-[#090605] to-[#040202] text-[#d6ccc2] border-t border-white/10 pt-20 pb-12 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-cafe-caramel/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cafe-mocha to-cafe-caramel flex items-center justify-center border border-cafe-gold/40">
                <span className="font-serif font-bold text-lg text-cafe-cream">A</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif tracking-[0.25em] text-xl font-bold text-cafe-cream group-hover:text-cafe-caramel transition-colors">
                  AURA
                </span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-cafe-gold/80 font-light">
                  Roastery & Atelier
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#b0a294] font-light leading-relaxed max-w-sm mb-6">
              A contemporary sanctuary of sensory coffee craft. Single-origin micro-lots roasted with precision and served with architectural serenity.
            </p>

            {/* Newsletter Subscription */}
            <div className="w-full max-w-sm">
              <span className="block text-xs uppercase tracking-widest text-cafe-gold font-medium mb-3">
                Join The Roaster's Guild
              </span>
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full pl-4 pr-28 py-3 rounded-full bg-white/[0.05] border border-white/10 text-xs text-cafe-cream placeholder:text-white/30 focus:outline-none focus:border-cafe-caramel/60 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1 px-4 py-2 rounded-full bg-cafe-caramel hover:bg-cafe-amber text-cafe-darkest text-xs font-semibold tracking-wider uppercase transition-all shadow-md"
                >
                  {subscribed ? <CheckCircle2 className="w-4 h-4 text-emerald-950 inline" /> : 'Join'}
                </button>
              </form>
              {subscribed && (
                <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Welcome to the guild! Check your inbox for reserve notes.
                </p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg text-cafe-cream mb-6 tracking-wide">Explore</h4>
            <ul className="space-y-3 text-xs tracking-wider uppercase font-light text-[#a89b8d]">
              <li><Link to="/menu" className="hover:text-cafe-gold transition-colors">Reserve Menu</Link></li>
              <li><Link to="/story" className="hover:text-cafe-gold transition-colors">Bean Origins & Story</Link></li>
              <li><Link to="/reservations" className="hover:text-cafe-gold transition-colors">Tasting Table Booking</Link></li>
              <li><Link to="/contact" className="hover:text-cafe-gold transition-colors">Atelier Locations</Link></li>
              <li><a href="#roast-compass" className="hover:text-cafe-gold transition-colors">Flavor Compass</a></li>
            </ul>
          </div>

          {/* Hours & Schedule */}
          <div>
            <h4 className="font-serif text-lg text-cafe-cream mb-6 tracking-wide">Atelier Hours</h4>
            <div className="space-y-4 text-xs font-light text-[#b0a294]">
              <div>
                <p className="text-cafe-gold font-medium uppercase tracking-wider mb-1">Monday – Friday</p>
                <p>06:30 AM – 09:30 PM</p>
              </div>
              <div>
                <p className="text-cafe-gold font-medium uppercase tracking-wider mb-1">Saturday – Sunday</p>
                <p>07:30 AM – 10:30 PM</p>
              </div>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[10px] uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Barista Counter Open Now
                </span>
              </div>
            </div>
          </div>

          {/* Contact Coordinates */}
          <div>
            <h4 className="font-serif text-lg text-cafe-cream mb-6 tracking-wide">Coordinates</h4>
            <div className="space-y-3 text-xs font-light text-[#b0a294]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cafe-caramel shrink-0 mt-0.5" />
                <span>442 Espresso Boulevard, Heritage District, New York, NY</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cafe-caramel shrink-0" />
                <span>+1 (212) 890-2872</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cafe-caramel shrink-0" />
                <span>concierge@auracafe.com</span>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-3">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 rounded-full glass-panel border border-white/10 hover:border-cafe-caramel/50 text-[#d4c6b8] hover:text-cafe-gold transition-colors"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 rounded-full glass-panel border border-white/10 hover:border-cafe-caramel/50 text-[#d4c6b8] hover:text-cafe-gold transition-colors"
                  title="X Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a 
                  href="https://spotify.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 rounded-full glass-panel border border-white/10 hover:border-cafe-caramel/50 text-[#d4c6b8] hover:text-cafe-gold transition-colors"
                  title="AURA Lo-Fi Playlist"
                >
                  <Music className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-[#8a7c6f]">
          <p>© {new Date().getFullYear()} AURA Roastery & Atelier. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Designed with Passion & Coffee Steam</span>
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-cafe-gold hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <div className="w-6 h-6 rounded-full glass-panel flex items-center justify-center border border-white/10 group-hover:border-cafe-caramel">
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
