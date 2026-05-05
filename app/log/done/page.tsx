'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Nibble from '@/components/Nibble';
import { CheckCircle2 } from 'lucide-react';

export default function LogDone() {
  const router = useRouter();

  // Auto-redirect back to home after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 4000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-leaf/10">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        className="bg-white p-8 rounded-3xl shadow-lg flex flex-col items-center text-center max-w-sm"
      >
        <div className="relative mb-6">
          <Nibble mood="happy" className="w-32 h-32" />
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="absolute -bottom-2 -right-2 text-leaf bg-white rounded-full p-1 shadow-sm"
          >
            <CheckCircle2 size={32} />
          </motion.div>
        </div>
        
        <h2 className="font-serif text-2xl font-bold text-ink mb-3">Logged.</h2>
        <p className="text-ink/80 text-lg leading-relaxed">
          I'll check in with you in 2 hours to see how you're feeling.
        </p>
        <p className="text-ink/40 text-sm mt-4">
          No pressure — skip if you want.
        </p>
      </motion.div>
    </div>
  );
}
