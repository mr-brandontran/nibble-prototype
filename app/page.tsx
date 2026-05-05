'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Nibble from '@/components/Nibble';
import { Send } from 'lucide-react';

export default function Home() {
  const [input, setInput] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Pass the user input to the chat route via query params to initiate flow
    router.push(`/chat?initial=${encodeURIComponent(input)}`);
  };

  const suggestions = [
    "I just ate something I feel guilty about",
    "Help me pick what to eat",
    "I'm stressed and want to eat my feelings"
  ];

  return (
    <div className="flex flex-col min-h-screen pt-12 px-6">
      <div className="flex flex-col items-center text-center mt-8 mb-12">
        <Nibble mood="curious" className="w-32 h-32 mb-6" />
        <h1 className="font-serif text-3xl font-bold leading-tight mb-2 text-ink">
          Hi, I'm Nibble.<br/>How are you feeling right now?
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="relative mb-8">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="I feel like..."
          className="w-full bg-mist border-2 border-transparent focus:border-acorn/30 rounded-2xl py-4 pl-5 pr-14 text-lg outline-none transition-all placeholder:text-ink/40 shadow-sm"
        />
        <button 
          type="submit" 
          disabled={!input.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-acorn text-cream rounded-xl disabled:opacity-50 disabled:bg-ink/20 transition-colors"
        >
          <Send size={20} />
        </button>
      </form>

      <div className="flex flex-col gap-3">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => setInput(suggestion)}
            className="text-left bg-white border border-mist p-4 rounded-2xl shadow-sm hover:shadow-md hover:border-acorn/30 transition-all text-ink/80 text-sm font-medium"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
