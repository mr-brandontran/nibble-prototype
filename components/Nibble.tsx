'use client';

import { motion } from 'framer-motion';

type Mood = 'happy' | 'curious' | 'concerned' | 'sleepy';

interface NibbleProps {
  mood?: Mood;
  className?: string;
}

export default function Nibble({ mood = 'curious', className = '' }: NibbleProps) {
  // Animation variants
  const bobbing = {
    y: [0, -4, 0],
    transition: {
      duration: mood === 'sleepy' ? 3 : 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  const renderEyes = () => {
    switch (mood) {
      case 'happy':
        return (
          <>
            <path d="M 30 40 Q 35 35 40 40" stroke="#3A322B" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 60 40 Q 65 35 70 40" stroke="#3A322B" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        );
      case 'sleepy':
        return (
          <>
            <line x1="30" y1="42" x2="40" y2="42" stroke="#3A322B" strokeWidth="3" strokeLinecap="round" />
            <line x1="60" y1="42" x2="70" y2="42" stroke="#3A322B" strokeWidth="3" strokeLinecap="round" />
          </>
        );
      case 'concerned':
        return (
          <>
            <circle cx="35" cy="40" r="4" fill="#3A322B" />
            <circle cx="65" cy="40" r="4" fill="#3A322B" />
            <line x1="30" y1="32" x2="40" y2="36" stroke="#3A322B" strokeWidth="2" strokeLinecap="round" />
            <line x1="60" y1="36" x2="70" y2="32" stroke="#3A322B" strokeWidth="2" strokeLinecap="round" />
          </>
        );
      case 'curious':
      default:
        return (
          <>
            <circle cx="35" cy="40" r="4" fill="#3A322B" />
            <circle cx="65" cy="40" r="4" fill="#3A322B" />
          </>
        );
    }
  };

  const renderMouth = () => {
    switch (mood) {
      case 'happy':
        return <path d="M 45 55 Q 50 62 55 55" stroke="#3A322B" strokeWidth="2" fill="none" strokeLinecap="round" />;
      case 'concerned':
        return <path d="M 45 58 Q 50 55 55 58" stroke="#3A322B" strokeWidth="2" fill="none" strokeLinecap="round" />;
      case 'sleepy':
        return <circle cx="50" cy="56" r="2" fill="#3A322B" />;
      case 'curious':
      default:
        return <circle cx="50" cy="56" r="2" fill="#3A322B" />;
    }
  };

  return (
    <motion.div 
      className={`relative w-24 h-24 ${className}`}
      animate={bobbing as any}
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        {/* Tail */}
        <path d="M 80 50 Q 110 30 85 80 Q 70 90 60 70" fill="#8B5E3C" />
        <path d="M 85 55 Q 105 35 85 75 Q 75 80 65 70" fill="#724B30" />
        
        {/* Ears */}
        <path d="M 25 35 L 30 15 L 45 25 Z" fill="#8B5E3C" />
        <path d="M 75 35 L 70 15 L 55 25 Z" fill="#8B5E3C" />

        {/* Body/Head */}
        <circle cx="50" cy="50" r="35" fill="#8B5E3C" />
        
        {/* Tummy/Face accent */}
        <circle cx="50" cy="55" r="22" fill="#D9C0A3" />

        {/* Eyes & Mouth */}
        {renderEyes()}
        {renderMouth()}
        
        {/* Nose */}
        <circle cx="50" cy="50" r="3" fill="#3A322B" />
        
        {/* Little paws */}
        <circle cx="35" cy="75" r="6" fill="#8B5E3C" />
        <circle cx="65" cy="75" r="6" fill="#8B5E3C" />
      </svg>
      {mood === 'sleepy' && (
        <motion.div
          initial={{ opacity: 0, y: 0, x: 0 }}
          animate={{ opacity: [0, 1, 0], y: -20, x: 10 }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          className="absolute top-0 right-0 text-ink font-serif text-sm font-bold"
        >
          z
        </motion.div>
      )}
    </motion.div>
  );
}
