import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Sparkles, Filter, Plus, Check, X, Flame, Leaf, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const MENU_ITEMS = [
  // Espresso Bar
  {
    id: 'esp-1',
    name: 'Yirgacheffe Single-Origin Double Espresso',
    category: 'Espresso Bar',
    price: 5.5,
    description: 'Extracted at 9.2 Bar. Notes of candied bergamot, jasmine florals, and wild honey.',
    roast: 'Light City',
    calories: '5 kcal',
    tags: ['Organic', 'Single Origin'],
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    flavor: { acidity: 90, sweetness: 80, body: 65 }
  },
  {
    id: 'esp-2',
    name: 'Smoked Vanilla Madagascar Cortado',
    category: 'Espresso Bar',
    price: 6.8,
    description: 'Equal parts single-origin espresso and silky micro-foamed milk with house-smoked vanilla pod syrup.',
    roast: 'Medium',
    calories: '110 kcal',
    tags: ['Signature'],
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&auto=format&fit=crop&q=80',
    flavor: { acidity: 60, sweetness: 85, body: 80 }
  },
  {
    id: 'esp-3',
    name: 'Golden Velvet Flat White',
    category: 'Espresso Bar',
    price: 6.5,
    description: 'Double ristretto blended with aerated textured micro-foam showcasing natural latte art sweetness.',
    roast: 'Medium-Light',
    calories: '130 kcal',
    tags: ['Popular'],
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=600&auto=format&fit=crop&q=80',
    flavor: { acidity: 55, sweetness: 90, body: 85 }
  },
  {
    id: 'esp-4',
    name: 'Mocha Noir with Valrhona 72% Ganache',
    category: 'Espresso Bar',
    price: 7.2,
    description: 'Melted dark French chocolate ganache whisked into rich espresso and steamed oat milk.',
    roast: 'Dark Roast',
    calories: '240 kcal',
    tags: ['Indulgent'],
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop&q=80',
    flavor: { acidity: 35, sweetness: 95, body: 95 }
  },

  // Cold Brews & Nitro
  {
    id: 'cld-1',
    name: 'Kyoto 18-Hour Slow Cold Drip',
    category: 'Cold Brews',
    price: 8.5,
    description: 'Ice-water drops percolated drop-by-drop through micro-lot grounds over 18 hours in handcrafted glass towers.',
    roast: 'Light-Medium',
    calories: '10 kcal',
    tags: ['Reserve', 'Nitro'],
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80',
    flavor: { acidity: 70, sweetness: 90, body: 85 }
  },
  {
    id: 'cld-2',
    name: 'Cascara Sparkling Cold Tonic',
    category: 'Cold Brews',
    price: 7.0,
    description: 'Sun-dried coffee cherry cascara steeped with botanical tonic, fresh rosemary, and dehydrated orange wheel.',
    roast: 'Botanical',
    calories: '45 kcal',
    tags: ['Refreshing', 'Organic'],
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80',
    flavor: { acidity: 95, sweetness: 75, body: 40 }
  },
  {
    id: 'cld-3',
    name: 'Nitro Velvet Draft Cold Brew',
    category: 'Cold Brews',
    price: 7.5,
    description: 'Infused with food-grade pure nitrogen gas on pressurized draft tap. Unbelievably creamy without added dairy.',
    roast: 'Medium',
    calories: '5 kcal',
    tags: ['Nitro', 'Vegan'],
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop&q=80',
    flavor: { acidity: 40, sweetness: 70, body: 90 }
  },

  // Matcha & Artisanal Tea
  {
    id: 'tea-1',
    name: 'Uji Ceremonial Cloud Matcha',
    category: 'Matcha & Tea',
    price: 8.0,
    description: 'Stone-ground Tencha green tea whisked with bamboo chasen, layered over chilled oat cloud milk.',
    roast: 'Spring Harvest',
    calories: '90 kcal',
    tags: ['Ceremonial', 'Vegan'],
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop&q=80',
    flavor: { acidity: 20, sweetness: 85, body: 85 }
  },
  {
    id: 'tea-2',
    name: 'Roasted Hojicha Amber Latte',
    category: 'Matcha & Tea',
    price: 7.5,
    description: 'Charcoal-roasted green tea leaves with warm toasty caramel aroma, low caffeine, and oat milk swirl.',
    roast: 'Charcoal Roast',
    calories: '95 kcal',
    tags: ['Organic'],
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80',
    flavor: { acidity: 15, sweetness: 80, body: 80 }
  },
  {
    id: 'tea-3',
    name: 'Silver Needle White Tea Reserve',
    category: 'Matcha & Tea',
    price: 9.0,
    description: 'Unopened fuzzy tea buds plucked at sunrise in Fujian. Subtle notes of honeydew melon and fresh morning rain.',
    roast: 'Sun-Dried',
    calories: '0 kcal',
    tags: ['Rare Reserve'],
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=600&auto=format&fit=crop&q=80',
    flavor: { acidity: 30, sweetness: 90, body: 40 }
  },

  // Artisanal Bakery
  {
    id: 'bak-1',
    name: 'Honey Caramel Almond Croissant',
    category: 'Bakery',
    price: 7.2,
    description: 'Triple-laminated with Normandy AOP butter, wild lavender honey syrup, and toasted French almond frangipane.',
    roast: 'Daily Bake',
    calories: '380 kcal',
    tags: ['Bestseller'],
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80',
    flavor: { acidity: 10, sweetness: 95, body: 90 }
  },
  {
    id: 'bak-2',
    name: 'Pistachio Cardamom Cruffin',
    category: 'Bakery',
    price: 7.8,
    description: 'Flaky hybrid pastry filled with Sicilian bronte pistachio cream and dusted with crushed green cardamom sugar.',
    roast: 'Daily Bake',
    calories: '410 kcal',
    tags: ['Artisan'],
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    flavor: { acidity: 15, sweetness: 92, body: 85 }
  },
  {
    id: 'bak-3',
    name: 'Sourdough Brioche with Espresso Butter',
    category: 'Bakery',
    price: 6.5,
    description: 'Warm thick-cut cultured sourdough brioche served with whipped honeyed espresso compound butter and sea salt.',
    roast: 'Wild Ferment',
    calories: '310 kcal',
    tags: ['Organic'],
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&auto=format&fit=crop&q=80',
    flavor: { acidity: 25, sweetness: 75, body: 95 }
  }
];

const CATEGORIES = ['All', 'Espresso Bar', 'Cold Brews', 'Matcha & Tea', 'Bakery'];

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [customizingItem, setCustomizingItem] = useState(null);
  const [milkOption, setMilkOption] = useState('Whole Milk');
  const [sweetnessOption, setSweetnessOption] = useState('Standard (100%)');
  const [tempOption, setTempOption] = useState('Hot');
  const { addToCart } = useCart();

  const filteredItems = selectedCategory === 'All'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.category === selectedCategory);

  const openCustomizeModal = (item) => {
    setCustomizingItem(item);
    setMilkOption('Whole Milk');
    setSweetnessOption('Standard (100%)');
    setTempOption('Hot');
  };

  const handleConfirmAdd = () => {
    if (!customizingItem) return;
    addToCart(customizingItem, {
      milk: milkOption,
      temperature: tempOption,
      sweetness: sweetnessOption,
    });
    setCustomizingItem(null);
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-gradient-to-b from-[#0b0806] via-[#120d0a] to-[#0a0705] min-h-screen text-cafe-cream">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-cafe-caramel/30 text-xs tracking-[0.25em] uppercase text-cafe-gold mb-4"
          >
            <Coffee className="w-3.5 h-3.5 text-cafe-caramel" />
            <span>Curated Artisan Menu</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl text-cafe-cream font-normal mb-4"
          >
            Single-Origin Extractions & Delicacies
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-[#b6a798] font-light leading-relaxed"
          >
            Roasted in small batches on cast-iron drums. Choose your beverage to calibrate milk selections, temperature, and roast profile.
          </motion.p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-300 cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-cafe-caramel to-cafe-gold text-cafe-darkest font-semibold shadow-lg shadow-cafe-caramel/25 scale-105'
                    : 'glass-panel border-white/5 text-[#a89b8d] hover:border-white/20 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Menu Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group rounded-3xl glass-panel border border-white/10 overflow-hidden flex flex-col justify-between hover:border-cafe-caramel/40 transition-all duration-300 shadow-xl hover:-translate-y-1.5"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140e0a] via-transparent to-transparent opacity-80" />
                  
                  {/* Tags */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                    {item.tags.map(t => (
                      <span key={t} className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] tracking-wider uppercase text-cafe-gold border border-white/10 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>

                  <span className="absolute bottom-3 right-4 text-xs font-mono text-[#ad9e90]">
                    {item.calories}
                  </span>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-serif text-xl font-medium text-cafe-cream group-hover:text-cafe-gold transition-colors">
                        {item.name}
                      </h3>
                    </div>
                    <p className="text-xs text-[#a39485] font-light leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Flavor meters preview */}
                    {item.flavor && (
                      <div className="flex items-center gap-4 text-[10px] font-mono text-[#8e8073] uppercase tracking-wider py-2 border-t border-white/5">
                        <span>Acidity: {item.flavor.acidity}%</span>
                        <span>Sweetness: {item.flavor.sweetness}%</span>
                        <span>Body: {item.flavor.body}%</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-cafe-caramel block">Price</span>
                      <span className="font-serif text-2xl font-semibold text-cafe-cream">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => openCustomizeModal(item)}
                      className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cafe-caramel to-cafe-gold text-cafe-darkest font-semibold text-xs uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-cafe-caramel/30 active:scale-95 cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Customize</span>
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Item Customization Modal */}
      <AnimatePresence>
        {customizingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCustomizingItem(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg bg-[#140e0a] border border-white/15 rounded-3xl p-6 md:p-8 shadow-2xl z-10 space-y-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-cafe-gold">
                    {customizingItem.category}
                  </span>
                  <h3 className="font-serif text-2xl text-cafe-cream">{customizingItem.name}</h3>
                  <p className="text-xs text-[#a09081] mt-1">${customizingItem.price.toFixed(2)} Base</p>
                </div>
                <button
                  onClick={() => setCustomizingItem(null)}
                  className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Milk Choice */}
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-cafe-gold mb-2.5">
                  Dairy & Plant Milk Selection
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Whole Milk', 'Oat Milk (Barista Blend)', 'Almond Milk', 'None / Black'].map((milk) => (
                    <button
                      key={milk}
                      onClick={() => setMilkOption(milk)}
                      className={`py-2 px-3 rounded-xl text-xs text-left border transition-all ${
                        milkOption === milk
                          ? 'bg-cafe-caramel/20 border-cafe-caramel text-cafe-gold font-medium'
                          : 'bg-white/5 border-white/10 text-[#a89b8d] hover:bg-white/10'
                      }`}
                    >
                      {milk}
                    </button>
                  ))}
                </div>
              </div>

              {/* Temperature */}
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-cafe-gold mb-2.5">
                  Serving Temperature
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Hot (Steamed 65°C)', 'Iced (Clear Sphere Cube)'].map((temp) => (
                    <button
                      key={temp}
                      onClick={() => setTempOption(temp)}
                      className={`py-2 px-3 rounded-xl text-xs text-left border transition-all ${
                        tempOption === temp
                          ? 'bg-cafe-caramel/20 border-cafe-caramel text-cafe-gold font-medium'
                          : 'bg-white/5 border-white/10 text-[#a89b8d] hover:bg-white/10'
                      }`}
                    >
                      {temp}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sweetness */}
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-cafe-gold mb-2.5">
                  Sweetener Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Unsweetened', 'Half Honey (50%)', 'Standard (100%)'].map((sw) => (
                    <button
                      key={sw}
                      onClick={() => setSweetnessOption(sw)}
                      className={`py-2 px-3 rounded-xl text-[11px] text-center border transition-all ${
                        sweetnessOption === sw
                          ? 'bg-cafe-caramel/20 border-cafe-caramel text-cafe-gold font-medium'
                          : 'bg-white/5 border-white/10 text-[#a89b8d] hover:bg-white/10'
                      }`}
                    >
                      {sw}
                    </button>
                  ))}
                </div>
              </div>

              {/* Confirm */}
              <div className="pt-2">
                <button
                  onClick={handleConfirmAdd}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-cafe-caramel to-cafe-gold text-cafe-darkest font-semibold text-xs uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-cafe-caramel/30 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Custom Cup to Order</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
