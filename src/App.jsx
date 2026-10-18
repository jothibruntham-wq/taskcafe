import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AudioProvider } from './context/AudioContext';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Story from './pages/Story';
import Reservations from './pages/Reservations';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AudioProvider>
          <SmoothScroll>
            <div className="relative min-h-screen bg-[#0b0806] text-[#f4efe8] flex flex-col justify-between selection:bg-cafe-caramel selection:text-cafe-darkest">
              {/* Persistent Modern Glassmorphic Navbar */}
              <Navbar />

              {/* Slide-out Order Cart Drawer */}
              <CartDrawer />

              {/* Main Page Routing */}
              <main className="flex-1 w-full">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/story" element={<Story />} />
                  <Route path="/reservations" element={<Reservations />} />
                  <Route path="/contact" element={<Contact />} />
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
