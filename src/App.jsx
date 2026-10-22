import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AudioProvider } from './context/AudioContext';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AudioProvider>
          <SmoothScroll>
            <div className="relative min-h-screen bg-[#0b0806] text-[#f4efe8] flex flex-col justify-between selection:bg-cafe-caramel selection:text-cafe-darkest">
              {/* Glassmorphic Section-Tracking Navbar */}
              <Navbar />

              {/* Slide-out Order Cart Drawer */}
              <CartDrawer />

              {/* Unified Single-Page Landing View */}
              <main className="flex-1 w-full">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Navigate to="/#menu" replace />} />
                  <Route path="/story" element={<Navigate to="/#story" replace />} />
                  <Route path="/reservations" element={<Navigate to="/#reservations" replace />} />
                  <Route path="/contact" element={<Navigate to="/#contact" replace />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              {/* Persistent Cinematic Modern Footer */}
              <Footer />
            </div>
          </SmoothScroll>
        </AudioProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
