import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function InnerComponent() {
  let [counter, setCounter] = useState(0)

  const handleUpdateCounter = () => {
    const nextState = counter + 1;
    setCounter(nextState)
    console.log(nextState)
  }

   const handleDecrementCounter = () => {
    const nextState = counter - 1;
    setCounter(nextState)
    console.log(nextState)
  }

   const handleResetCounter = () => {
    setCounter(0)
  }

  return (
    <div>
      <p>
        Counter {counter}
      </p>
      <button onClick={handleUpdateCounter}>Increment</button>
    <button onClick={handleDecrementCounter}>Decrement</button>
    <button onClick={handleResetCounter}>Reset</button>
    </div>
  )
}

function App() {

  // hooks
  // useState


  return (
    <div className="App">
       <InnerComponent />
    </div>
  );
}

export default App;
