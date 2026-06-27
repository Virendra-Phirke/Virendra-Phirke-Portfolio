'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';

export default function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRefs = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  const toggleAudio = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  const startAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        audioCtxRef.current = new AudioContext();
      } else {
        return;
      }
    }

    const ctx = audioCtxRef.current;
    
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 3); // Gentle fade in
    masterGain.connect(ctx.destination);
    gainNodeRef.current = masterGain;

    // Frequencies for a warm, ambient drone (Cmaj add 9, spaced out)
    const frequencies = [130.81, 196.00, 293.66, 329.63]; 
    
    frequencies.forEach((freq) => {
      const osc = ctx.createOscillator();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      osc.type = 'sine';
      osc.frequency.value = freq;

      filter.type = 'lowpass';
      filter.frequency.value = freq * 1.5;
      filter.Q.value = 1;
      
      // Subtle detune and modulation
      lfo.type = 'sine';
      lfo.frequency.value = 0.05 + Math.random() * 0.1; // Very slow LFO
      
      lfoGain.gain.value = 3; // Modulate frequency by 3 Hz
      
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      let panner;
      if (ctx.createStereoPanner) {
        panner = ctx.createStereoPanner();
        panner.pan.value = Math.random() * 0.6 - 0.3; // Slight random pan
      }

      osc.connect(filter);
      
      if (panner) {
        filter.connect(panner);
        panner.connect(masterGain);
      } else {
        filter.connect(masterGain);
      }
      
      osc.start();
      lfo.start();
      
      oscRefs.current.push(osc, lfo);
    });

    setIsPlaying(true);
  };

  const stopAudio = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 2); // Fade out
      setTimeout(() => {
        oscRefs.current.forEach(osc => {
          try { osc.stop(); } catch (e) {}
        });
        oscRefs.current = [];
        setIsPlaying(false);
      }, 2000);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (gainNodeRef.current && audioCtxRef.current) {
         gainNodeRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 0.5);
         setTimeout(() => {
          oscRefs.current.forEach(osc => {
            try { osc.stop(); } catch (e) {}
          });
          oscRefs.current = [];
         }, 500);
      }
    };
  }, []);

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleAudio}
      className={`fixed bottom-6 right-6 rounded-full w-12 h-12 border border-border bg-background/50 backdrop-blur-md z-50 transition-all duration-1000 ${isPlaying ? 'text-primary border-primary/50 shadow-[0_0_20px_rgba(220,38,38,0.15)]' : 'text-muted-foreground hover:text-muted-foreground'}`}
      title={isPlaying ? "Mute ambient sound" : "Play ambient sound"}
    >
      {isPlaying ? (
         <div className="relative flex items-center justify-center">
            <Volume2 className="w-5 h-5" />
            <motion.div
               className="absolute inset-0 rounded-full border border-primary/30"
               animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
               transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
         </div>
      ) : (
         <VolumeX className="w-5 h-5" />
      )}
    </Button>
  );
}
