import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const perksTarget = 25.0;
  const perksProgress = Math.min((subtotal / perksTarget) * 100, 100);
  const perksRemaining = Math.max(perksTarget - subtotal, 0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#d9822b', '#dfa863', '#20392c', '#ffffff'],
      });
    }, 1200);
  };

  const handleFinish = () => {
    setOrderComplete(false);
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-[#130d0a] border-l border-white/10 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-cafe-caramel/20 flex items-center justify-center border border-cafe-caramel/40">
                    <ShoppingBag className="w-4 h-4 text-cafe-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-cafe-cream font-medium">Your Reserve Order</h3>
                    <p className="text-xs text-[#a69688] font-light">Freshly roasted & prepared on demand</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Sample Reward Bar */}
              <div className="px-6 py-3 bg-cafe-mocha/30 border-b border-white/5">
                <div className="flex items-center justify-between text-xs mb-1.5 font-light">
                  <span className="flex items-center gap-1.5 text-cafe-gold">
                    <Sparkles className="w-3.5 h-3.5" />
                    {perksRemaining === 0 ? "You've unlocked a complimentary 50g Micro-Lot!" : `Add $${perksRemaining.toFixed(2)} more for complimentary sample`}
                  </span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-cafe-caramel to-cafe-gold h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${perksProgress}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </div>

              {/* Items List or Order Complete */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {orderComplete ? (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="font-serif text-2xl text-cafe-cream">Order Received!</h4>
                    <p className="text-xs text-[#c4b5a5] max-w-xs leading-relaxed">
                      Our Head Barista has received your custom brew ticket. Your order will be prepared with precision temperature timing.
                    </p>
                    <div className="p-4 rounded-2xl glass-panel border border-white/10 w-full text-xs text-left space-y-1.5 font-mono">
                      <div className="flex justify-between text-[#a09080]">
                        <span>Order No:</span>
                        <span className="text-cafe-gold">#AU-{Math.floor(1000 + Math.random() * 9000)}</span>
                      </div>
                      <div className="flex justify-between text-[#a09080]">
                        <span>Estimated Pickup:</span>
                        <span className="text-cafe-cream">12 - 15 mins</span>
                      </div>
                      <div className="flex justify-between text-[#a09080]">
                        <span>Barista Station:</span>
                        <span className="text-cafe-cream">La Marzocco PB #02</span>
                      </div>
                    </div>
                    <button
                      onClick={handleFinish}
                      className="w-full py-3 rounded-full bg-gradient-to-r from-cafe-caramel to-cafe-gold text-cafe-darkest font-semibold text-xs uppercase tracking-widest hover:brightness-110 transition-all mt-4"
                    >
                      Done & Close
                    </button>
                  </motion.div>
                ) : cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-[#8e7e70] py-12">
                    <ShoppingBag className="w-12 h-12 stroke-[1] mb-3 opacity-40" />
                    <p className="font-serif text-lg text-cafe-cream mb-1">Your cart is empty</p>
                    <p className="text-xs font-light max-w-xs mb-6">Explore our seasonal single-origin roasts and artisanal pastries.</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-2.5 rounded-full border border-cafe-caramel/40 text-cafe-gold text-xs uppercase tracking-wider hover:bg-cafe-caramel/10 transition-all"
                    >
                      Browse Reserve Menu
                    </button>
                  </div>
                ) : (
                  cartItems.map((item, idx) => (
                    <div
                      key={`${item.id}-${item.milk}-${idx}`}
                      className="p-4 rounded-2xl glass-panel border border-white/5 flex gap-4 items-center group hover:border-cafe-caramel/30 transition-all"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-xl border border-white/10 shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-cafe-cream truncate">{item.name}</h4>
                        <p className="text-[11px] text-[#9c8d80] mt-0.5 truncate">
                          {item.milk} {item.temperature && `• ${item.temperature}`}
                        </p>
                        <p className="text-xs font-semibold text-cafe-gold mt-1">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => removeFromCart(item.id, item.milk)}
                          className="text-white/30 hover:text-red-400 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-full border border-white/10 text-xs">
                          <button
                            onClick={() => updateQuantity(item.id, item.milk, -1)}
                            className="text-white/60 hover:text-white p-0.5"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-4 text-center font-mono font-medium text-cafe-cream">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.milk, 1)}
                            className="text-white/60 hover:text-white p-0.5"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Summary & Checkout */}
              {!orderComplete && cartItems.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-[#0d0806]/80 backdrop-blur-md space-y-4">
                  <div className="space-y-1.5 text-xs font-light text-[#b2a496]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-cafe-cream">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Artisan Roaster Tax (8%)</span>
                      <span className="text-cafe-cream">${(subtotal * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-sm text-cafe-cream pt-2 border-t border-white/10">
                      <span>Total</span>
                      <span className="text-cafe-gold">${(subtotal * 1.08).toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    disabled={isCheckingOut}
                    onClick={handleCheckout}
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-cafe-caramel to-cafe-gold text-cafe-darkest font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-cafe-caramel/20 cursor-pointer"
                  >
                    {isCheckingOut ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-cafe-darkest border-t-transparent rounded-full animate-spin" />
                        Transmitting to Barista...
                      </span>
                    ) : (
                      <>
                        <span>Place Reserve Order</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
