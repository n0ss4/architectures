import './App.css';
import { useCounterStore } from './store/useCounterStore';
// @ts-ignore
import RemoteProvider, { CounterContext } from 'mfe1_app';

const App = () => {
  const counterStore = useCounterStore();

  return (
    <div className="content">
      <h1>Host App</h1>
      <div style={{ marginBottom: '2rem' }}>
        <p>Counter from shared Zustand store: {counterStore.count}</p>
        <button onClick={counterStore.increment}>Increment</button>
        <button onClick={counterStore.decrement} style={{ marginLeft: '0.5rem' }}>Decrement</button>
        <button onClick={counterStore.reset} style={{ marginLeft: '0.5rem' }}>Reset</button>
      </div>
      <hr />
      <CounterContext.Provider value={counterStore}>
        <RemoteProvider />
      </CounterContext.Provider>
    </div>
  );
};

export default App;
