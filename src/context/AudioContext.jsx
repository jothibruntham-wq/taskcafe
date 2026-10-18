import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const noiseSourceRef = useRef(null);
  const toneOscsRef = useRef([]);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
      
      const masterGain = audioCtxRef.current.createGain();
      masterGain.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
      masterGain.connect(audioCtxRef.current.destination);
      gainNodeRef.current = masterGain;
    }
  };

  const startAmbient = () => {
    try {
      initAudio();
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;

      // 1. Warm filtered brown noise (Rain / Gentle Cafe Room Acoustic)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 2.5; // boost volume slightly
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(450, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.08, now);

      whiteNoise.connect(lowpass);
      lowpass.connect(noiseGain);
      noiseGain.connect(gainNodeRef.current);
      whiteNoise.start();
      noiseSourceRef.current = whiteNoise;

      // 2. Harmonic warm coffeehouse chord (Warm F-Major7 ambient pad)
      const freqs = [174.61, 220.00, 261.63, 329.63]; // F3, A3, C4, E4
      const oscs = freqs.map((freq, index) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = index % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        oscGain.gain.setValueAtTime(0.015, now);
        
        // Soft LFO tremolo
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.2 + (index * 0.1), now);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(0.008, now);
        lfo.connect(lfoGain);
        lfoGain.connect(oscGain.gain);
        lfo.start();

        osc.connect(oscGain);
        oscGain.connect(gainNodeRef.current);
        osc.start();

        return { osc, lfo };
      });
      toneOscsRef.current = oscs;

      setIsPlaying(true);
    } catch (e) {
      console.warn("Ambient audio start prevented by browser policy:", e);
    }
  };

  const stopAmbient = () => {
    try {
      if (noiseSourceRef.current) {
        noiseSourceRef.current.stop();
        noiseSourceRef.current.disconnect();
        noiseSourceRef.current = null;
      }
      if (toneOscsRef.current) {
        toneOscsRef.current.forEach(({ osc, lfo }) => {
          osc.stop();
          osc.disconnect();
          lfo.stop();
          lfo.disconnect();
        });
        toneOscsRef.current = [];
      }
      setIsPlaying(false);
    } catch (e) {
      console.error(e);
      setIsPlaying(false);
    }
  };

  const toggleAmbient = () => {
    if (isPlaying) {
      stopAmbient();
    } else {
      startAmbient();
    }
  };

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(volume, audioCtxRef.current.currentTime, 0.1);
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      stopAmbient();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAmbient, volume, setVolume }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used within an AudioProvider');
  return context;
};
