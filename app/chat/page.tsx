'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, ArrowRight } from 'lucide-react';
import Nibble from '@/components/Nibble';
import { chatFlows } from '@/lib/mockData';

type Message = {
  id: string;
  sender: 'user' | 'nibble';
  text: string;
  mood?: 'happy' | 'curious' | 'concerned' | 'sleepy';
  options?: string[];
  requireInput?: boolean;
  isEnd?: boolean;
  logPrefill?: string;
};

import { Suspense } from 'react';

// ... (other imports)

export default function Chat() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-cream text-ink">Loading...</div>}>
      <ChatContent />
    </Suspense>
  );
}

function ChatContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('initial') || '';
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentFlow, setCurrentFlow] = useState<any>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  
  const [fridgeInput, setFridgeInput] = useState('');
  const [moodInput, setMoodInput] = useState('');

  const hasInitialized = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (!initialQuery || hasInitialized.current) return;
    hasInitialized.current = true;
    
    // Add user's initial message
    setMessages([{
      id: 'user-init',
      sender: 'user',
      text: initialQuery
    }]);

    // Determine flow
    const lowerQuery = initialQuery.toLowerCase();
    let selectedFlow: any = chatFlows.flowA; // Default fallback

    if (chatFlows.flowB.triggers.some(t => lowerQuery.includes(t))) {
      selectedFlow = chatFlows.flowB;
    } else if (chatFlows.flowC.triggers.some(t => lowerQuery.includes(t))) {
      selectedFlow = chatFlows.flowC;
    } else if (chatFlows.flowA.triggers.some(t => lowerQuery.includes(t))) {
      selectedFlow = chatFlows.flowA;
    }

    setCurrentFlow(selectedFlow);
    setStepIndex(0);
    
    // Start AI response
    triggerNextStep(selectedFlow, 0);
  }, [initialQuery]);

  const triggerNextStep = (flow: any, index: number) => {
    if (index >= flow.steps.length) return;

    setIsTyping(true);
    
    // Random delay between 600-900ms
    const delay = Math.floor(Math.random() * 300) + 600;
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, flow.steps[index]]);
      setStepIndex(index + 1);
      
      // If the current message doesn't require user input (no options, no text fields, not the end), 
      // trigger the next one automatically
      const currentStep = flow.steps[index];
      if (!currentStep.options && !currentStep.requireInput && !currentStep.isEnd) {
        triggerNextStep(flow, index + 1);
      }
    }, delay);
  };

  const handleOptionClick = (option: string) => {
    // Add user message
    setMessages(prev => [...prev, {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: option
    }]);
    
    // Trigger next AI step
    triggerNextStep(currentFlow, stepIndex);
  };

  const handleDualInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fridgeInput.trim() || !moodInput.trim()) return;
    
    setMessages(prev => [...prev, {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: `Fridge: ${fridgeInput}. Mood: ${moodInput}.`
    }]);
    
    triggerNextStep(currentFlow, stepIndex);
  };

  return (
    <div className="flex flex-col h-screen pt-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pb-4 border-b border-mist bg-cream/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-mist flex items-center justify-center overflow-hidden">
             <Nibble mood="curious" className="w-12 h-12 translate-y-1" />
          </div>
          <span className="font-serif font-bold text-lg text-ink">Nibble</span>
        </div>
        <button 
          onClick={() => router.push('/')}
          className="p-2 text-ink/50 hover:text-ink transition-colors flex items-center gap-1 text-sm font-medium"
        >
          <RefreshCw size={14} /> Start over
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              {msg.sender === 'nibble' && (
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-xs font-semibold text-ink/40 ml-1">Nibble</span>
                </div>
              )}
              <div 
                className={`max-w-[85%] rounded-2xl p-4 ${
                  msg.sender === 'user' 
                    ? 'bg-acorn text-cream rounded-br-sm' 
                    : 'bg-white border border-mist text-ink rounded-bl-sm shadow-sm'
                }`}
              >
                {msg.text}
              </div>
              
              {/* Options */}
              {msg.options && i === messages.length - 1 && (
                <div className="flex flex-wrap gap-2 mt-4 w-full">
                  {msg.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(opt)}
                      className="bg-white border-2 border-acorn/20 hover:border-acorn/50 text-ink px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Dual Input (Flow B) */}
              {msg.requireInput && i === messages.length - 1 && (
                <form onSubmit={handleDualInputSubmit} className="mt-4 w-full flex flex-col gap-3">
                  <input
                    type="text"
                    value={fridgeInput}
                    onChange={(e) => setFridgeInput(e.target.value)}
                    placeholder="What's in your fridge?"
                    className="w-full bg-white border border-mist p-3 rounded-xl outline-none focus:border-acorn/40 text-sm"
                  />
                  <input
                    type="text"
                    value={moodInput}
                    onChange={(e) => setMoodInput(e.target.value)}
                    placeholder="What mood do you want?"
                    className="w-full bg-white border border-mist p-3 rounded-xl outline-none focus:border-acorn/40 text-sm"
                  />
                  <button 
                    type="submit"
                    disabled={!fridgeInput.trim() || !moodInput.trim()}
                    className="bg-acorn text-cream py-3 rounded-xl font-medium disabled:opacity-50 mt-1"
                  >
                    Send
                  </button>
                </form>
              )}

              {/* End Card */}
              {msg.isEnd && i === messages.length - 1 && (
                <div className="mt-6 w-full bg-white border-2 border-leaf/20 rounded-2xl p-5 flex flex-col items-center text-center shadow-sm">
                  <h3 className="font-serif font-bold text-lg mb-2">Log this meal?</h3>
                  <button
                    onClick={() => router.push(msg.logPrefill ? `/log?prefill=${msg.logPrefill}` : '/log')}
                    className="w-full bg-leaf text-cream py-3 rounded-xl font-medium mt-3 flex items-center justify-center gap-2 hover:bg-leaf/90 transition-colors"
                  >
                    Log {msg.logPrefill ? msg.logPrefill.replace('-', ' ') : 'it'} <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start"
            >
              <div className="bg-white border border-mist rounded-2xl rounded-bl-sm p-4 shadow-sm flex gap-1">
                <motion.div className="w-2 h-2 bg-acorn/40 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                <motion.div className="w-2 h-2 bg-acorn/40 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                <motion.div className="w-2 h-2 bg-acorn/40 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
