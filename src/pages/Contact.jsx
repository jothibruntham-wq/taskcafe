import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Clock, Send, CheckCircle2, ChevronDown } from 'lucide-react';

const LOCATIONS = [
  {
    name: 'Heritage District Flagship & Roastery',
    address: '442 Espresso Boulevard, New York, NY 10012',
    hours: 'Mon – Fri: 06:30 AM – 09:30 PM | Sat – Sun: 07:30 AM – 10:30 PM',
    phone: '+1 (212) 890-2872',
    status: 'Open Now • Live Barista Wait: ~3 mins',
    features: ['Cast-Iron Roaster Visible', 'Marble Lever Bar', 'Complimentary High-Speed WiFi'],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700&auto=format&fit=crop&q=80'
  },
  {
    name: 'The Greenhouse Botanical Atelier',
    address: '88 Conservatory Lane, Brooklyn, NY 11211',
    hours: 'Daily: 07:00 AM – 08:00 PM',
    phone: '+1 (718) 450-9122',
    status: 'Open Now • Outdoor Seating Available',
    features: ['Sunken Garden Patio', 'Matcha Tea Bar', 'Pet Friendly Conservatory'],
    image: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=700&auto=format&fit=crop&q=80'
  }
];

const FAQS = [
  {
    q: 'Can I purchase roasted whole beans ground for my specific coffee maker?',
    a: 'Absolutely. We grind custom to order for Chemex, French Press, Aeropress, Moka pot, or Espresso upon dispatch to preserve volatiles.'
  },
  {
    q: 'Do you offer dairy-free and vegan beverage options?',
    a: 'Yes. We steam premium organic Oatly Barista Edition, house-pressed almond milk, and macadamia milk at no additional surcharge.'
  },
  {
    q: 'Can I host a private corporate tasting or barista masterclass?',
    a: 'Yes. Our Private Tasting Vault and Greenhouse are available for private events, coffee cupping ceremonies, and latte art workshops.'
  },
  {
    q: 'Are pets allowed in the outdoor spaces?',
    a: 'Well-mannered dogs are warmly welcomed in our outdoor courtyard garden and conservatory patio at both locations.'
  }
];

export default function Contact() {
  const [openFaq, setOpenFaq] = useState(0);
  const [inquirySent, setInquirySent] = useState(false);
  const [formType, setFormType] = useState('General Inquiry');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSend = (e) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4500);
  };

  return (
    <section id="contact" className="relative py-28 md:py-36 px-6 md:px-12 bg-gradient-to-b from-[#0e0906] via-[#120c09] to-[#0e0907] text-cafe-cream">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-cafe-caramel/30 text-xs tracking-[0.25em] uppercase text-cafe-gold mb-4">
            <MapPin className="w-3.5 h-3.5 text-cafe-caramel" />
            <span>Atelier & Contact</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-cafe-cream font-normal mb-4">
            Visit Our Sanctuaries
          </h1>
          <p className="text-sm text-[#bcaea1] font-light leading-relaxed">
            Come smell the fresh roast, observe live kinetic extractions, or connect with our roaster team.
          </p>
        </div>

        {/* Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {LOCATIONS.map((loc) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl glass-panel border border-white/10 overflow-hidden shadow-2xl flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[10px] uppercase font-mono tracking-wider text-emerald-400 backdrop-blur-md">
                  {loc.status}
                </span>
              </div>

              <div className="p-6 md:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-cafe-cream mb-2 font-medium">{loc.name}</h3>
                  <div className="space-y-2 text-xs text-[#a99a8d] font-light">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-cafe-caramel shrink-0" />
                      <span>{loc.address}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-cafe-caramel shrink-0" />
                      <span>{loc.hours}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-cafe-caramel shrink-0" />
                      <span>{loc.phone}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                  {loc.features.map(f => (
                    <span key={f} className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 text-[#cdbeaf]">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Form & FAQs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form */}
          <div className="lg:col-span-6 rounded-3xl glass-panel border border-white/10 p-6 md:p-10">
            <span className="text-xs font-mono uppercase tracking-widest text-cafe-gold">
              Direct Concierge Desk
            </span>
            <h3 className="font-serif text-3xl text-cafe-cream mt-1 mb-4">Send An Inquiry</h3>

            <div className="flex flex-wrap gap-2 mb-6">
              {['General Inquiry', 'Wholesale Beans', 'Private Masterclass', 'Press'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormType(type)}
                  className={`px-3 py-1.5 rounded-full text-[11px] border font-mono transition-all ${
                    formType === type
                      ? 'bg-cafe-caramel text-cafe-darkest font-semibold border-cafe-caramel'
                      : 'bg-white/5 border-white/10 text-[#a89b8d] hover:border-white/20'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {inquirySent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 space-y-3"
              >
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-serif text-xl text-white">Message Transmitted</h4>
                <p className="text-xs text-[#b8d4c3] font-light">
                  Our head roaster concierge will respond within 4 business hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSend} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase font-mono text-cafe-gold mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vivienne Westwood"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-cafe-cream placeholder:text-white/20 focus:outline-none focus:border-cafe-caramel"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-mono text-cafe-gold mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. vivienne@studio.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-cafe-cream placeholder:text-white/20 focus:outline-none focus:border-cafe-caramel"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-mono text-cafe-gold mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your event, wholesale roaster inquiry, or coffee question..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-cafe-cream placeholder:text-white/20 focus:outline-none focus:border-cafe-caramel"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-cafe-caramel to-cafe-gold text-cafe-darkest font-semibold text-xs uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-cafe-caramel/30 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* FAQs */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-cafe-gold">
              Got Questions?
            </span>
            <h3 className="font-serif text-3xl text-cafe-cream mb-6">Frequently Answered Notes</h3>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.q}
                    className="rounded-2xl glass-panel border border-white/10 overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full p-5 text-left flex items-center justify-between text-sm font-medium text-cafe-cream hover:text-cafe-gold transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-cafe-caramel transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-5 pb-5 text-xs text-[#a39485] font-light leading-relaxed border-t border-white/5 pt-3"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
