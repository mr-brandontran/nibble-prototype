'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Camera, Type, Image as ImageIcon } from 'lucide-react';

const EMOTIONS = [
  { emoji: '😋', label: 'satisfied' },
  { emoji: '😐', label: 'neutral' },
  { emoji: '😣', label: 'guilty' },
  { emoji: '😴', label: 'sluggish' },
  { emoji: '🔥', label: 'wired' },
  { emoji: '😊', label: 'happy' }
];

import { Suspense } from 'react';
import { useAppContext } from '@/app/context/AppContext';

export default function LogMeal() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-cream text-ink">Loading...</div>}>
      <LogMealContent />
    </Suspense>
  );
}

function LogMealContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefill = searchParams.get('prefill');
  const { addMeal } = useAppContext();

  const [tab, setTab] = useState<'photo' | 'type'>('type');
  const [typedFood, setTypedFood] = useState('');
  const [photoDetected, setPhotoDetected] = useState(false);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (prefill === 'fried-chicken') {
      setTypedFood('Fried chicken with fries');
      setTab('type');
    }
  }, [prefill]);

  const toggleEmotion = (label: string) => {
    setSelectedEmotions(prev => {
      if (prev.includes(label)) {
        return prev.filter(e => e !== label);
      }
      if (prev.length >= 2) {
        return [prev[1], label];
      }
      return [...prev, label];
    });
  };

  const handleLog = (e: React.FormEvent) => {
    e.preventDefault();
    
    const foodName = tab === 'photo' && photoDetected ? 'Fried chicken with fries' : typedFood;
    
    // Format current time nicely e.g., "8:30 PM"
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    
    // Convert selected emotions to the tag format e.g., "😋 satisfied"
    const tags = selectedEmotions.map(label => {
      const emotionObj = EMOTIONS.find(e => e.label === label);
      return `${emotionObj?.emoji} ${label}`;
    });

    addMeal({
      food: foodName,
      time: timeString,
      tags: tags
    });

    router.push('/log/done');
  };

  return (
    <div className="flex flex-col min-h-screen pt-12 px-6">
      <h1 className="font-serif text-3xl font-bold text-ink mb-8">What did you eat?</h1>

      {/* Tabs */}
      <div className="flex bg-mist rounded-xl p-1 mb-6">
        <button
          onClick={() => setTab('photo')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-colors ${
            tab === 'photo' ? 'bg-white shadow-sm text-ink' : 'text-ink/60'
          }`}
        >
          <Camera size={16} /> Photo
        </button>
        <button
          onClick={() => setTab('type')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-colors ${
            tab === 'type' ? 'bg-white shadow-sm text-ink' : 'text-ink/60'
          }`}
        >
          <Type size={16} /> Type it
        </button>
      </div>

      <form onSubmit={handleLog} className="flex-1 flex flex-col gap-8">
        {/* Input Area */}
        {tab === 'photo' ? (
          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={() => setPhotoDetected(true)}
              className="w-full h-48 border-2 border-dashed border-acorn/30 rounded-2xl flex flex-col items-center justify-center gap-2 text-acorn/60 hover:bg-acorn/5 hover:border-acorn/50 transition-all overflow-hidden relative"
            >
              {photoDetected ? (
                <>
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center opacity-80" />
                  <div className="absolute inset-0 bg-ink/20" />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur text-ink px-4 py-2 rounded-lg text-sm font-medium shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-leaf animate-pulse"></span>
                    Detected: Fried chicken with fries
                  </div>
                </>
              ) : (
                <>
                  <ImageIcon size={32} />
                  <span className="font-medium">Tap to snap a photo</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-ink/80 pl-1">Food name</label>
            <input
              type="text"
              value={typedFood}
              onChange={(e) => setTypedFood(e.target.value)}
              placeholder="e.g., Avocado toast"
              className="w-full bg-white border border-mist p-4 rounded-xl outline-none focus:border-acorn/40 text-lg shadow-sm"
              required={tab === 'type'}
            />
          </div>
        )}

        {/* Emotion Picker */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-ink/80 pl-1">
            How do you feel physically? <span className="text-ink/40 font-normal">(Pick up to 2)</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {EMOTIONS.map((emotion) => {
              const isSelected = selectedEmotions.includes(emotion.label);
              return (
                <button
                  key={emotion.label}
                  type="button"
                  onClick={() => toggleEmotion(emotion.label)}
                  className={`flex flex-col items-center justify-center gap-1 p-3 rounded-xl border-2 transition-all ${
                    isSelected 
                      ? 'border-acorn bg-acorn/10 text-ink shadow-sm' 
                      : 'border-transparent bg-white shadow-sm text-ink/70 hover:border-acorn/20'
                  }`}
                >
                  <span className="text-2xl">{emotion.emoji}</span>
                  <span className="text-xs font-medium">{emotion.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Optional Notes */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-ink/80 pl-1">Anything else? (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ate while watching TV..."
            className="w-full bg-white border border-mist p-4 rounded-xl outline-none focus:border-acorn/40 text-base shadow-sm min-h-[100px] resize-none"
          />
        </div>

        {/* Submit */}
        <div className="mt-auto pt-4 mb-4">
          <button
            type="submit"
            disabled={(tab === 'type' && !typedFood) || (tab === 'photo' && !photoDetected) || selectedEmotions.length === 0}
            className="w-full bg-acorn text-cream py-4 rounded-xl font-bold text-lg shadow-md disabled:opacity-50 transition-opacity"
          >
            Log it
          </button>
        </div>
      </form>
    </div>
  );
}
