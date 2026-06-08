import { useState, useEffect } from "react";
import "./App.css"
function App(){
  const [tasks,setTasks] = useState([]);
  const [curTask,setCurTask] = useState("");
  const [show,setShow] = useState(false);
  const [editIndex,setEditIndex] = useState(-1);
  const [editText,setEditText] = useState("");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    setTasks(JSON.parse(savedTasks));
  }

  setLoaded(true);
}, []);
useEffect(() => {
  if (!loaded) return;

  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks, loaded]);
  function displayTextBox(){
    setShow(true);
  }
  function addTask(){
    const newTasks = [...tasks, curTask];
    setTasks(newTasks);
    setShow(false);
    setCurTask("");
  }
  function deleteTask(indexToDelete){
    const newTasks = tasks.filter((item, index) => index !== indexToDelete);
    setTasks(newTasks);
  }
  function savingEdit(){
    const newTasks = [...tasks];
    newTasks[editIndex] = editText;
    setTasks(newTasks);
    setEditIndex(-1);
    setEditText("");
  }
  return(
    <div>
      <div className = "heading">
        <h1>to-do-list</h1>
      </div>
      <div className = "addButton">
        <button className = "plusButton" onClick={displayTextBox}>+</button>
        { show && (
        <div className="textbox">
          <input type="text" onChange = {(event)=>{
            setCurTask(event.target.value);
          }} placeholder="Enter a task" />
          <button onClick = {addTask}>submit</button>
        </div>)}
        {
          tasks.map((task, index) => (
          <div className = "displayTasks">
            {
              editIndex === index ? (
                <input
                  value={editText}
                  onChange={(e) => {
                  setEditText(e.target.value);
              }}
              />
              ) : (
              <p className="task">{task}</p>
              )
            }
            <div className = "taskButtons">
            {
              editIndex === index ? (
              <button onClick = {savingEdit}>Save</button>
              ) : (
              <button onClick={() => {
                setEditIndex(index);
                setEditText(task);
              }}>
              Edit
              </button>
              )
            }
            <button onClick = {()=>{
              deleteTask(index);
            }}>Delete</button>
            </div>
          </div>
          ))
        }
      </div>
    </div>
  );
}
export default App;