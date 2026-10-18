import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, Sparkles, CheckCircle2, MapPin, Coffee, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const SEATING_ZONES = [
  {
    id: 'counter',
    name: 'Barista Extraction Counter',
    atmosphere: 'Front-row view of custom Slayer lever machines & kinetic pour-over towers',
    capacity: '1 - 2 Guests',
    tag: 'Interactive',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=700&auto=format&fit=crop&q=80'
  },
  {
    id: 'lounge',
    name: 'Fireplace Velvet Nook',
    atmosphere: 'Deep Italian leather armchairs beside a low-burning fireplace & acoustic warmth',
    capacity: '2 - 4 Guests',
    tag: 'Cozy & Intimate',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700&auto=format&fit=crop&q=80'
  },
  {
    id: 'greenhouse',
    name: 'Glasshouse Garden Terrace',
    atmosphere: 'Sunlit conservatory filled with rare arabica coffee trees & weeping figs',
    capacity: '2 - 6 Guests',
    tag: 'Botanical',
    image: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=700&auto=format&fit=crop&q=80'
  },
  {
    id: 'vault',
    name: 'Private Tasting Vault',
    atmosphere: 'Sound-dampened architectural vault for guided single-origin cupping masterclasses',
    capacity: '4 - 8 Guests',
    tag: 'Exclusive Flight',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=700&auto=format&fit=crop&q=80'
  }
];

const TIME_SLOTS = [
  '08:00 AM', '09:30 AM', '11:00 AM', '01:00 PM', '02:30 PM', '04:00 PM', '06:00 PM', '07:30 PM'
];

export default function Reservations() {
  const [selectedZone, setSelectedZone] = useState(SEATING_ZONES[0]);
  const [guestCount, setGuestCount] = useState(2);
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [specialNote, setSpecialNote] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const booking = {
      id: `AU-RES-${Math.floor(10000 + Math.random() * 90000)}`,
      name: guestName || 'Esteemed Guest',
      email: guestEmail || 'guest@example.com',
      date: selectedDate,
      time: selectedTime,
      zone: selectedZone.name,
      guests: guestCount,
      notes: specialNote,
    };

    setConfirmedBooking(booking);
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#d9822b', '#e0a96d', '#ffffff', '#20392c'],
    });
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-gradient-to-b from-[#0b0806] via-[#140e0b] to-[#0a0705] min-h-screen text-cafe-cream">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-cafe-caramel/30 text-xs tracking-[0.25em] uppercase text-cafe-gold mb-4">
            <Calendar className="w-3.5 h-3.5 text-cafe-caramel" />
            <span>Table & Flight Reservations</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-cafe-cream font-normal mb-4">
            Reserve Your Tasting Sanctuary
          </h1>
          <p className="text-sm text-[#bcaea1] font-light leading-relaxed">
            Whether for a solitary morning pour-over, a curated micro-lot flight with friends, or an intimate creative meeting.
          </p>
        </div>

        {/* Confirmation Pass Screen */}
        <AnimatePresence>
          {confirmedBooking ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-xl mx-auto rounded-3xl glass-panel border border-cafe-caramel/50 p-8 md:p-12 text-center shadow-2xl relative overflow-hidden"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <span className="text-xs font-mono uppercase tracking-widest text-cafe-gold">
                Reservation Confirmed
              </span>
              <h2 className="font-serif text-3xl text-cafe-cream mt-1 mb-2">We look forward to hosting you.</h2>
              <p className="text-xs text-[#a89b8e] font-light max-w-sm mx-auto mb-8">
                A confirmation concierge email and Apple Wallet pass have been dispatched to {confirmedBooking.email}.
              </p>

              {/* Digital Boarding Pass */}
              <div className="p-6 rounded-2xl bg-black/60 border border-white/10 text-left font-mono text-xs space-y-3 mb-8">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-[#8e8073]">PASS CODE:</span>
                  <span className="text-cafe-gold font-bold">{confirmedBooking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8e8073]">PRIMARY GUEST:</span>
                  <span className="text-cafe-cream">{confirmedBooking.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8e8073]">DATE & TIME:</span>
                  <span className="text-cafe-cream">{confirmedBooking.date} @ {confirmedBooking.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8e8073]">SEATING ATMOSPHERE:</span>
                  <span className="text-cafe-cream">{confirmedBooking.zone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8e8073]">PARTY SIZE:</span>
                  <span className="text-cafe-cream">{confirmedBooking.guests} Person(s)</span>
                </div>
              </div>

              <button
                onClick={() => setConfirmedBooking(null)}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-cafe-caramel to-cafe-gold text-cafe-darkest font-semibold text-xs uppercase tracking-widest hover:brightness-110 transition-all cursor-pointer"
              >
                Book Another Table
              </button>
            </motion.div>
          ) : (
            /* Booking Form & Interactive Zone Selector */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Zone Selector (Left 7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <h3 className="font-serif text-2xl text-cafe-cream">1. Select Preferred Atmosphere</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SEATING_ZONES.map((zone) => {
                    const active = selectedZone.id === zone.id;
                    return (
                      <button
                        key={zone.id}
                        type="button"
                        onClick={() => setSelectedZone(zone)}
                        className={`group rounded-2xl overflow-hidden border text-left transition-all duration-300 relative flex flex-col justify-between ${
                          active
                            ? 'bg-white/10 border-cafe-caramel shadow-xl scale-[1.02]'
                            : 'glass-panel border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="relative aspect-[16/9] w-full overflow-hidden">
                          <img
                            src={zone.image}
                            alt={zone.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] tracking-wider uppercase text-cafe-gold font-mono">
                            {zone.tag}
                          </span>
                        </div>

                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-serif text-base text-cafe-cream font-medium">{zone.name}</h4>
                            <p className="text-[11px] text-[#a19283] font-light mt-1 leading-snug">
                              {zone.atmosphere}
                            </p>
                          </div>
                          <span className="text-[10px] uppercase font-mono text-cafe-caramel mt-3 block">
                            Capacity: {zone.capacity}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Booking Details Form (Right 5 cols) */}
              <div className="lg:col-span-5">
                <form
                  onSubmit={handleSubmit}
                  className="rounded-3xl glass-panel border border-white/10 p-6 md:p-8 space-y-5"
                >
                  <h3 className="font-serif text-2xl text-cafe-cream">2. Guest Details</h3>

                  {/* Date & Guests */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase font-mono text-cafe-gold mb-1">
                        Tasting Date
                      </label>
                      <input
                        type="date"
                        required
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-cafe-cream focus:outline-none focus:border-cafe-caramel"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-mono text-cafe-gold mb-1">
                        Guests
                      </label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full p-2.5 rounded-xl bg-[#1a120d] border border-white/10 text-xs text-cafe-cream focus:outline-none focus:border-cafe-caramel"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Time Slot */}
                  <div>
                    <label className="block text-[11px] uppercase font-mono text-cafe-gold mb-2">
                      Arrival Time Slot
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`py-2 rounded-lg text-[10px] font-mono border transition-all ${
                            selectedTime === slot
                              ? 'bg-cafe-caramel text-cafe-darkest font-bold border-cafe-caramel'
                              : 'bg-white/5 border-white/10 text-[#a39487] hover:border-white/20'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div>
                    <label className="block text-[11px] uppercase font-mono text-cafe-gold mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Julian Montgomery"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-cafe-cream placeholder:text-white/20 focus:outline-none focus:border-cafe-caramel"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-mono text-cafe-gold mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. julian@atelier.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-cafe-cream placeholder:text-white/20 focus:outline-none focus:border-cafe-caramel"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-mono text-cafe-gold mb-1">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Anniversary celebration, prefer quiet corner..."
                      value={specialNote}
                      onChange={(e) => setSpecialNote(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-cafe-cream placeholder:text-white/20 focus:outline-none focus:border-cafe-caramel"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-cafe-caramel to-cafe-gold text-cafe-darkest font-semibold text-xs uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-cafe-caramel/30 cursor-pointer flex items-center justify-center gap-2 mt-4"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Confirm Complimentary Reservation</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
