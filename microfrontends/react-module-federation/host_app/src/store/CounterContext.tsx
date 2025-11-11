import React, { createContext, useContext } from 'react';
import { useCounterStore } from './useCounterStore';

interface CounterContextType {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const CounterContext = createContext<CounterContextType | null>(null);

export const CounterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = useCounterStore();

  return (
    <CounterContext.Provider value={store}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounter = () => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter must be used within CounterProvider');
  }
  return context;
};
