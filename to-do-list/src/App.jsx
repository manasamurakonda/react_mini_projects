import { useState } from "react";
function App(){
  const [tasks,setTasks] = useState([]);
  const [curTask,setCurTask] = useState("");
  const [show,setShow] = useState(false);
  function displayTextBox(){
    setShow(true);
  }
  function addTask(){
    const newTasks = [...tasks, curTask];
    setTasks(newTasks);
    setShow(false);
  }
  function deleteTask(indexToDelete){
    const newTasks = tasks.filter((item, index) => index !== indexToDelete);
    setTasks(newTasks);
  }
  return(
    <div>
      <div className = "heading">
        <h1>to-do-list</h1>
      </div>
      <div className = "addButton">
        <button onClick={displayTextBox}>+</button>
        { show && (
        <div>
          <input type="text" onChange = {(event)=>{
            setCurTask(event.target.value);
          }} placeholder="Enter a task" />
          <button onClick = {addTask}>submit</button>
        </div>)}
        {
          tasks.map((task, index) => (
          <div>
            <p key={index}>{task}</p>
            <button onClick = {()=>{
              deleteTask(index);
            }}>Delete</button>
          </div>
          ))
        }
      </div>
    </div>
  );
}
export default App;