import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const TIMELINE_STAGES = [
  {
    stage: '01 / Origin & Terroir',
    title: 'Highland Soil & Volcanic Mineral Clouds',
    location: 'Guji & Yirgacheffe, Ethiopia • 2,150m Elevation',
    description: 'In the high altitudes of Southern Ethiopia, indigenous heirloom Arabica varieties grow slowly beneath the forest canopy. The diurnal temperature fluctuation traps dense sugars within the coffee cherry, providing exceptional floral clarity.',
    image: 'https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?w=900&auto=format&fit=crop&q=80',
    stat: '2,150m Terroir'
  },
  {
    stage: '02 / Ethical Direct-Trade',
    title: 'Cultivating Communities with Above-Fair-Trade Premiums',
    location: 'Direct Partnership with 42 Farming Families',
    description: 'We eliminate intermediaries entirely. By paying 3.2x the global C-market average directly to agricultural cooperatives, we fund solar-powered water filtration and primary schools across regional harvest clusters.',
    image: 'https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?w=900&auto=format&fit=crop&q=80',
    stat: '3.2x Above C-Price'
  },
  {
    stage: '03 / Fermentation & Sun-Drying',
    title: 'Anaerobic Slow Maceration & Raised Drying Beds',
    location: '18 Days of Ambient Sun Dehydration',
    description: 'Harvested at peak Brix sweetness (24°+), the cherries undergo 72 hours of oxygen-free yeast maceration before resting on African raised drying beds turned every 30 minutes to ensure pristine uniformity.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&auto=format&fit=crop&q=80',
    stat: '72hr Fermentation'
  },
  {
    stage: '04 / Thermodynamic Roasting',
    title: 'The Art of First Crack & Airflow Modulation',
    location: 'Cast-Iron Drum Atelier, NY',
    description: 'Using specialized infrared probes measuring bean surface and core temperatures simultaneously, our roast masters tailor each lot to highlight bright phosphoric acidity without a trace of char.',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=900&auto=format&fit=crop&q=80',
    stat: '0.1°C Thermocouple'
  }
];

const ROAST_PROFILES = [
  {
    name: 'Nordic Light Roast',
    temp: '198°C',
    color: '#dfa863',
    notes: 'Jasmine blossom, lemongrass, white peach, delicate tea structure.',
    scand: 'Favors syphon, Chemex, and crystal-clear batch brews.'
  },
  {
    name: 'Medium Velvet Roast',
    temp: '206°C',
    color: '#d9822b',
    notes: 'Toffee caramel, dark raspberry, toasted hazelnut, balanced brightness.',
    scand: 'The quintessential base for velvety flat whites and cortados.'
  },
  {
    name: 'Artisan Dark Reserve',
    temp: '215°C',
    color: '#8b5a2b',
    notes: 'Single-origin cacao nibs, smoked cedar, pipe tobacco, syrupy dark molasses.',
    scand: 'Thick golden crema for Italian lever-pull espresso shots.'
  }
];

export default function Story() {
  const [selectedRoast, setSelectedRoast] = useState(0);

  return (
    <section id="story" className="relative py-28 md:py-36 px-6 md:px-12 bg-gradient-to-b from-[#0d1612] via-[#140e0b] to-[#120d0a] text-cafe-cream">
      <div className="max-w-6xl mx-auto">
        {/* Story Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-cafe-caramel/30 text-xs tracking-[0.25em] uppercase text-cafe-gold mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-cafe-caramel" />
            <span>The Sacred Odyssey</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl text-cafe-cream font-normal mb-6"
          >
            From Mist-Clad Peaks to Your Daily Ritual
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-[#bdae9f] font-light leading-relaxed"
          >
            Trace the deliberate patience behind every drop. We celebrate the hands of ancestral farmers, the rhythm of solar dehydration, and the science of the roaster's flame.
          </motion.p>
        </div>

        {/* Timeline Journey with alternating parallax blocks */}
        <div className="space-y-24 mb-28">
          {TIMELINE_STAGES.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={item.stage}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  isEven ? '' : 'lg:grid-flow-dense'
                }`}
              >
                {/* Image */}
                <div className={`relative rounded-3xl overflow-hidden glass-panel border border-white/10 aspect-[16/11] shadow-2xl group ${
                  !isEven ? 'lg:col-start-2' : ''
                }`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-6 left-6 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-xs font-mono text-cafe-gold border border-white/15">
                    {item.stat}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <span className="text-xs uppercase font-mono tracking-widest text-cafe-gold">
                    {item.stage}
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl text-cafe-cream font-normal">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-cafe-caramel tracking-wider">
                    {item.location}
                  </p>
                  <p className="text-sm text-[#b6a799] font-light leading-relaxed pt-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Roasting Curve Explorer */}
        <div className="p-8 md:p-14 rounded-3xl glass-panel border border-white/10 mb-28 relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-mono tracking-widest text-cafe-gold">
              Roaster’s Thermocouple
            </span>
            <h3 className="font-serif text-3xl md:text-4xl text-cafe-cream mt-2 font-normal">
              Select A Temperature Profile
            </h3>
            <p className="text-xs text-[#a39485] font-light mt-2">
              How thermodynamic duration dictates solubility and aromatic release.
            </p>
          </div>

          {/* Selector Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {ROAST_PROFILES.map((p, idx) => {
              const active = selectedRoast === idx;
              return (
                <button
                  key={p.name}
                  onClick={() => setSelectedRoast(idx)}
                  className={`p-5 rounded-2xl text-left border transition-all ${
                    active
                      ? 'bg-white/10 border-cafe-caramel shadow-lg scale-105'
                      : 'bg-white/5 border-white/5 text-[#9e9082] hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                    <span className="font-mono text-xs text-cafe-gold">{p.temp}</span>
                  </div>
                  <h4 className="font-serif text-lg text-cafe-cream font-medium">{p.name}</h4>
                  <p className="text-xs text-[#a9998b] mt-1 font-light">{p.notes}</p>
                </button>
              );
            })}
          </div>

          <div className="p-6 rounded-2xl bg-black/40 border border-white/10 text-xs text-[#c4b5a6] font-light flex items-center justify-between">
            <span>Recommended Extraction Pairing:</span>
            <span className="font-mono text-cafe-gold">{ROAST_PROFILES[selectedRoast].scand}</span>
          </div>
        </div>

        {/* Sustainable Metrics & Founders Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-8 rounded-3xl glass-panel border border-white/10">
            <h4 className="font-serif text-4xl font-bold text-cafe-gold mb-1">42</h4>
            <p className="text-xs uppercase font-mono text-[#a89a8c] tracking-wider">Independent Smallholders</p>
            <p className="text-xs text-[#8e8174] font-light mt-3 leading-relaxed">
              Family farms with average cultivation plots under 2 hectares.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-panel border border-white/10">
            <h4 className="font-serif text-4xl font-bold text-cafe-gold mb-1">0%</h4>
            <p className="text-xs uppercase font-mono text-[#a89a8c] tracking-wider">Plastic Packaging</p>
            <p className="text-xs text-[#8e8174] font-light mt-3 leading-relaxed">
              100% home-compostable barrier bags with plant-based degas valves.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-panel border border-white/10">
            <h4 className="font-serif text-4xl font-bold text-cafe-gold mb-1">100%</h4>
            <p className="text-xs uppercase font-mono text-[#a89a8c] tracking-wider">Renewable Solar Roasting</p>
            <p className="text-xs text-[#8e8174] font-light mt-3 leading-relaxed">
              Our flagship Brooklyn atelier operates on zero grid fossil fuels.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
