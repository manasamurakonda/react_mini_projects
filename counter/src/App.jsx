import { useState } from "react";
import "./App.css";
function App(){
  const [count, setCount] = useState(0);
  function increment(){
    setCount(count+1);
  }
  function decrement(){
    setCount(count-1);
  }
  function reset(){
    setCount(0);
  }
  return(
    <div className = "container">
      <h1> Counter App</h1>
      <div className = "counter">
        <p>count: {count}</p>
      </div><br></br>
      <div className = "buttons">
        <button onClick={increment}>+</button>
        <button onClick={reset}>reset</button>
        <button onClick={decrement}>-</button>
      </div>
    </div>
  );
}
export default App;

