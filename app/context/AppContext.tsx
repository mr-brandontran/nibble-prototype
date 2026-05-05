'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { recentMeals as initialMeals } from '@/lib/mockData';

export type Meal = {
  id: number;
  food: string;
  time: string;
  tags: string[];
};

type AppContextType = {
  recentMeals: Meal[];
  addMeal: (meal: Omit<Meal, 'id'>) => void;
  updateMealMood: (id: number, newTag: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [recentMeals, setRecentMeals] = useState<Meal[]>(initialMeals);

  const addMeal = (mealData: Omit<Meal, 'id'>) => {
    const newMeal: Meal = {
      ...mealData,
      id: Date.now(), // Generate a simple unique ID
    };
    // Add to the top of the list
    setRecentMeals((prev) => [newMeal, ...prev]);
  };

  const updateMealMood = (id: number, newTag: string) => {
    setRecentMeals((prev) => 
      prev.map(meal => {
        if (meal.id === id) {
          // Check if tag already exists to avoid duplicates
          if (!meal.tags.includes(newTag)) {
            return { ...meal, tags: [...meal.tags, newTag] };
          }
        }
        return meal;
      })
    );
  };

  return (
    <AppContext.Provider value={{ recentMeals, addMeal, updateMealMood }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
