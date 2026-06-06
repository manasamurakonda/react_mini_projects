import { useState } from 'react'
import "./App.css";
function App(){
  const [colour,setColor] = useState("white");
  function changeColor(){
    let colors = ["red","blue","green","yellow","white","aqua","purple","pink","violet","skyblue"]
    let ind = Math.floor(Math.random()*colors.length);
    setColor(colors[ind]);
  }
  return(
    <div style={{backgroundColor: colour, height: "100vh", transition: "0.3s"}}>
      <div className = "heading">
        <h1>backgroundColorChanger</h1>
      </div>
      <button onClick={changeColor}>change colour</button>
    </div>
  );
}
export default App;