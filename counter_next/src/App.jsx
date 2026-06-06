import { useState } from "react";
import "./App.css";
function App(){
  const [count,setCount] = useState(0);
  const [status,setStatus] = useState("zero");
  function increment(){
    let newCount = count+1;
    setCount(newCount);
    if(newCount>0)
      setStatus("positive");
    else if(newCount<0)
      setStatus("negative");
    else setStatus("zero");
  }
  function reset(){
    setCount(0);
    setStatus("zero");
  }
  function decrement(){
    let newCount = count-1;
    setCount(newCount);
    if(newCount>0)
      setStatus("positive");
    else if(newCount<0)
      setStatus("negative");
    else setStatus("zero");
  }
  return(
    <div className = "container">
      <h1>counter with status</h1>
      <div className = "counter">
        <p>counter: {count}</p>
      </div>
      <div className = "status">
        <p>{status}</p>
      </div>
      <div className = "buttons">
        <button onClick = {increment}>+</button>
        <button onClick = {reset}>reset</button>
        <button onClick = {decrement}>-</button>
      </div>
    </div>
  );
}
export default App;