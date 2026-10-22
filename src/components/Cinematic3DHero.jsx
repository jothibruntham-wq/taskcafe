import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowDown, Coffee } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { scrollToSection } from '../utils/scroll';

export default function Cinematic3DHero() {
  const mountRef = useRef(null);
  const { toggleAmbient, isPlaying } = useAudio();

  // Scroll animations for overlay text
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.92]);
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    // Warm foggy atmosphere
    scene.fog = new THREE.FogExp2(0x0b0806, 0.04);

    const camera = new THREE.PerspectiveCamera(
      45,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2.2, 5.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    currentMount.appendChild(renderer.domElement);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xf5d6b3, 0.9);
    scene.add(ambientLight);

    const warmSpot = new THREE.SpotLight(0xff9d42, 4.5, 25, Math.PI / 4, 0.6, 1);
    warmSpot.position.set(3, 7, 4);
    scene.add(warmSpot);

    const coolRimLight = new THREE.DirectionalLight(0xa5c9eb, 1.8);
    coolRimLight.position.set(-4, 3, -3);
    scene.add(coolRimLight);

    const bottomGlow = new THREE.PointLight(0xd9822b, 2.0, 10);
    bottomGlow.position.set(0, -1, 1);
    scene.add(bottomGlow);

    // --- 3D COFFEE CUP & SAUCER ---
    const cupGroup = new THREE.Group();
    cupGroup.position.set(0, -0.4, 0);

    // Saucer
    const saucerGeo = new THREE.CylinderGeometry(1.6, 1.1, 0.12, 48);
    const ceramicMat = new THREE.MeshStandardMaterial({
      color: 0x18120e,
      roughness: 0.25,
      metalness: 0.1,
    });
    const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
    saucer.position.y = -0.55;
    cupGroup.add(saucer);

    // Gold rim for saucer
    const saucerRimGeo = new THREE.TorusGeometry(1.6, 0.02, 16, 64);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xe0a96d,
      roughness: 0.3,
      metalness: 0.9,
    });
    const saucerRim = new THREE.Mesh(saucerRimGeo, goldMat);
    saucerRim.rotation.x = Math.PI / 2;
    saucerRim.position.y = -0.49;
    cupGroup.add(saucerRim);

    // Cup Body (Tapered Cylinder)
    const cupGeo = new THREE.CylinderGeometry(1.1, 0.75, 1.25, 48, 1, true);
    const cupBody = new THREE.Mesh(cupGeo, ceramicMat);
    cupGroup.add(cupBody);

    // Cup Base Inside
    const cupBaseGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.05, 48);
    const cupBase = new THREE.Mesh(cupBaseGeo, ceramicMat);
    cupBase.position.y = -0.6;
    cupGroup.add(cupBase);

    // Gold rim on top of the cup
    const cupGoldRimGeo = new THREE.TorusGeometry(1.1, 0.03, 16, 64);
    const cupGoldRim = new THREE.Mesh(cupGoldRimGeo, goldMat);
    cupGoldRim.rotation.x = Math.PI / 2;
    cupGoldRim.position.y = 0.62;
    cupGroup.add(cupGoldRim);

    // Handle
    const handleGeo = new THREE.TorusGeometry(0.42, 0.09, 16, 32, Math.PI * 1.1);
    const handle = new THREE.Mesh(handleGeo, ceramicMat);
    handle.rotation.z = -Math.PI / 6;
    handle.position.set(1.1, 0.05, 0);
    cupGroup.add(handle);

    // Coffee Liquid (Glossy Dark Espresso with warm crema hue)
    const liquidGeo = new THREE.CircleGeometry(1.04, 48);
    const liquidMat = new THREE.MeshStandardMaterial({
      color: 0x22130b,
      roughness: 0.1,
      metalness: 0.2,
    });
    const liquid = new THREE.Mesh(liquidGeo, liquidMat);
    liquid.rotation.x = -Math.PI / 2;
    liquid.position.y = 0.48;
    cupGroup.add(liquid);

    // Crema Art Spiral (subtle inner ring)
    const cremaGeo = new THREE.RingGeometry(0.3, 0.8, 32);
    const cremaMat = new THREE.MeshBasicMaterial({
      color: 0xbb804c,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide
    });
    const crema = new THREE.Mesh(cremaGeo, cremaMat);
    crema.rotation.x = -Math.PI / 2;
    crema.position.y = 0.485;
    cupGroup.add(crema);

    scene.add(cupGroup);

    // --- STEAM PARTICLES ---
    const steamCount = 75;
    const steamGeo = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamCount * 3);
    const steamScales = new Float32Array(steamCount);
    const steamSpeeds = new Float32Array(steamCount);
    const steamSeed = new Float32Array(steamCount);

    for (let i = 0; i < steamCount; i++) {
      steamPositions[i * 3] = (Math.random() - 0.5) * 0.7;
      steamPositions[i * 3 + 1] = 0.2 + Math.random() * 2.2;
      steamPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.7;
      steamScales[i] = Math.random() * 2 + 1;
      steamSpeeds[i] = 0.006 + Math.random() * 0.012;
      steamSeed[i] = Math.random() * 100;
    }

    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));

    // Canvas particle texture for smooth steam puffs
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(235, 220, 205, 0.75)');
    grad.addColorStop(0.5, 'rgba(215, 195, 175, 0.25)');
    grad.addColorStop(1, 'rgba(200, 180, 160, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    const steamTex = new THREE.CanvasTexture(canvas);

    const steamMat = new THREE.PointsMaterial({
      size: 0.55,
      map: steamTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.35,
    });
    const steamParticles = new THREE.Points(steamGeo, steamMat);
    scene.add(steamParticles);

    // --- FLOATING 3D COFFEE BEANS ---
    const beanCount = 30;
    const beanGroup = new THREE.Group();

    // Roasted Coffee Bean Geometry (elongated sphere with squashed center)
    const beanBaseGeo = new THREE.SphereGeometry(0.18, 16, 16);
    beanBaseGeo.scale(1, 1.45, 0.75);

    const beanMat = new THREE.MeshStandardMaterial({
      color: 0x3d2516,
      roughness: 0.45,
      metalness: 0.1,
    });

    const beans = [];
    for (let i = 0; i < beanCount; i++) {
      const bean = new THREE.Mesh(beanBaseGeo, beanMat);
      // Scatter in a cylinder around the camera and cup
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.8 + Math.random() * 2.8;
      bean.position.x = Math.cos(angle) * radius;
      bean.position.y = -1.2 + Math.random() * 4.2;
      bean.position.z = Math.sin(angle) * radius;

      bean.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      const rotSpeed = {
        x: (Math.random() - 0.5) * 0.015,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.015,
      };

      const floatOffset = Math.random() * Math.PI * 2;
      const initialY = bean.position.y;

      beans.push({ mesh: bean, rotSpeed, floatOffset, initialY });
      beanGroup.add(bean);
    }
    scene.add(beanGroup);

    // --- MOUSE PARALLAX & SCROLL LISTENERS ---
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 2.2;

    const handleMouseMove = (e) => {
      const rect = currentMount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- ANIMATION LOOP ---
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const scrollProgress = Math.min(window.scrollY / 800, 1.5);

      // Mouse Parallax + Scroll Camera Dynamic
      targetCameraX = mouseX * 0.6;
      targetCameraY = 2.2 + mouseY * 0.4 - scrollProgress * 1.2;

      camera.position.x += (targetCameraX - camera.position.x) * 0.04;
      camera.position.y += (targetCameraY - camera.position.y) * 0.04;
      camera.position.z = 5.8 - scrollProgress * 1.5; // Zoom in as user scrolls

      // Cup slight rotation & float
      cupGroup.rotation.y = elapsedTime * 0.15 + scrollProgress * 1.5;
      cupGroup.position.y = -0.4 + Math.sin(elapsedTime * 1.2) * 0.04;
      crema.rotation.z = elapsedTime * 0.05;

      camera.lookAt(0, -0.1 + scrollProgress * 0.4, 0);

      // Steam Particle Animation
      const pos = steamParticles.geometry.attributes.position.array;
      for (let i = 0; i < steamCount; i++) {
        pos[i * 3 + 1] += steamSpeeds[i];
        // Swirling turbulence
        pos[i * 3] += Math.sin(elapsedTime * 1.8 + steamSeed[i]) * 0.003;
        pos[i * 3 + 2] += Math.cos(elapsedTime * 1.5 + steamSeed[i]) * 0.003;

        // Reset if reached height
        if (pos[i * 3 + 1] > 2.8) {
          pos[i * 3 + 1] = 0.2;
          pos[i * 3] = (Math.random() - 0.5) * 0.6;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
        }
      }
      steamParticles.geometry.attributes.position.needsUpdate = true;

      // Bean rotation and floating
      beans.forEach((b) => {
        b.mesh.rotation.x += b.rotSpeed.x;
        b.mesh.rotation.y += b.rotSpeed.y;
        b.mesh.rotation.z += b.rotSpeed.z;
        b.mesh.position.y = b.initialY + Math.sin(elapsedTime + b.floatOffset) * 0.12;
      });

      // Bean group tilts gently with mouse
      beanGroup.rotation.y = mouseX * 0.2 + elapsedTime * 0.03;
      beanGroup.rotation.x = mouseY * 0.15;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section id="home" className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-cafe-darkest via-cafe-dark to-[#0b0806]">
      {/* 3D WebGL Canvas Mount */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 z-0 pointer-events-auto cursor-grab active:cursor-grabbing"
      />

      {/* Atmospheric Vignette & Gradients */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none z-[1] opacity-70" />
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#0b0806] via-[#0b0806]/80 to-transparent z-[2] pointer-events-none" />

      {/* Hero Content Overlay */}
      <motion.div 
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative z-10 max-w-6xl mx-auto px-6 text-center flex flex-col items-center pointer-events-none select-none"
      >
        {/* Top Floating Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-cafe-caramel/30 text-xs tracking-[0.25em] uppercase text-cafe-gold mb-6 shadow-lg shadow-black/40 pointer-events-auto"
        >
          <span className="w-2 h-2 rounded-full bg-cafe-caramel animate-ping" />
          <Sparkles className="w-3.5 h-3.5 text-cafe-caramel" />
          <span>Cinematic Roastery & Atelier</span>
        </motion.div>

        {/* Cinematic Main Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight text-cafe-cream leading-[1.05] mb-6 max-w-4xl"
        >
          Crafted in <span className="italic font-light text-cafe-caramel underline decoration-cafe-caramel/30 decoration-1 underline-offset-8">Silence.</span><br />
          Perfected in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cafe-cream via-cafe-gold to-cafe-caramel font-semibold">Steam.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base md:text-lg text-[#c8beaf] max-w-2xl font-light tracking-wide mb-10 leading-relaxed"
        >
          An extraordinary multi-sensory journey through rare micro-lots, kinetic extraction, and architectural hospitality.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto"
        >
          <button
            onClick={() => scrollToSection('menu')}
            className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-cafe-caramel to-[#e5963e] text-cafe-darkest font-semibold text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(217,130,43,0.5)] hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Coffee className="w-4 h-4 transition-transform group-hover:rotate-12" />
            <span>Explore Reserve Menu</span>
          </button>

          <button
            onClick={() => scrollToSection('reservations')}
            className="px-8 py-3.5 rounded-full glass-panel border border-white/15 text-cafe-cream hover:text-cafe-gold font-medium text-sm tracking-wider uppercase transition-all duration-300 hover:border-cafe-caramel/50 hover:bg-white/10 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <span>Book A Tasting Table</span>
          </button>
        </motion.div>

        {/* Spec Pill Highlights */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-14 hidden md:flex items-center gap-6 text-xs text-[#a39485] tracking-widest uppercase pointer-events-auto"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cafe-gold/70" />
            <span>Origin: Yirgacheffe 2,140m</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cafe-caramel/70" />
            <span>Extraction: 9.2 Bar Kinetic</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70" />
            <span>100% Direct-Trade Organic</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Ambient Sound Quick Player */}
      <motion.button
        onClick={toggleAmbient}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-8 z-20 flex items-center gap-3 px-4 py-2 rounded-full glass-panel border border-white/10 text-xs text-cafe-cream hover:border-cafe-caramel/50 transition-all cursor-pointer group shadow-lg"
      >
        <div className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-white/30'}`} />
        <span className="font-light tracking-wider">
          {isPlaying ? 'Playing Cafe Ambiance' : 'Turn On Cafe Ambiance'}
        </span>
        <div className="flex items-end gap-0.5 h-3">
          <span className={`w-0.5 bg-cafe-gold transition-all duration-300 ${isPlaying ? 'h-3 animate-pulse' : 'h-1'}`} />
          <span className={`w-0.5 bg-cafe-gold transition-all duration-300 ${isPlaying ? 'h-2 animate-pulse delay-75' : 'h-1'}`} />
          <span className={`w-0.5 bg-cafe-gold transition-all duration-300 ${isPlaying ? 'h-3.5 animate-pulse delay-150' : 'h-1'}`} />
        </div>
      </motion.button>

      {/* Scroll Down Indicator */}
      <motion.button 
        onClick={() => scrollToSection('philosophy')}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 right-8 z-20 hidden sm:flex items-center gap-2.5 text-xs tracking-widest uppercase text-[#a39485] hover:text-cafe-gold font-light cursor-pointer group"
      >
        <span>Scroll to Discover</span>
        <div className="w-8 h-8 rounded-full glass-panel flex items-center justify-center border border-white/10 group-hover:border-cafe-caramel/50 transition-colors">
          <ArrowDown className="w-3.5 h-3.5 text-cafe-gold" />
        </div>
      </motion.button>
    </section>
  );
}
