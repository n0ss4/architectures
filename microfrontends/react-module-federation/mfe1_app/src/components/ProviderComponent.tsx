import React, { createContext, useContext } from 'react';
import './ProviderComponent.css';

interface CounterContextType {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const CounterContext = createContext<CounterContextType | null>(null);

export const useRemoteCounter = () => {
  const context = useContext(CounterContext);
  return context;
};

const Provider: React.FC = () => {
  const counter = useRemoteCounter();

  if (!counter) {
    return (
      <div>
        <h2>Remote App (MFE)</h2>
        <p>Running standalone - no shared state</p>
      </div>
    );
  }

  const { count, increment, decrement } = counter;

  return (
    <div>
      <h2>Remote App (MFE)</h2>
      <div style={{ marginTop: '1rem' }}>
        <p>Shared Counter: {count}</p>
        <button onClick={increment}>Increment from Remote</button>
        <button onClick={decrement} style={{ marginLeft: '0.5rem' }}>Decrement from Remote</button>
      </div>
    </div>
  );
};

export default Provider;
export { CounterContext };
