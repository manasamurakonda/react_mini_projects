import { useState, useEffect } from "react";
import "./App.css"
function App(){
  const [show,setShow] = useState(false);
  const [curTitle,setCurTitle] = useState("");
  const [curNote,setCurNote] = useState("");
  const [notes,setNotes] = useState([]);
  const [editIndex,setEditIndex] = useState(-1);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [searchText,setSearchText] = useState("");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");

    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes, loaded]);
  function displayInputBox(){
    setEditIndex(-1);
    setShow(true);
  }
  function addNotes(){
    if(curTitle.trim() === "" || curNote.trim() === ""){
      return;
    }
    const note = {
      title: curTitle,
      content: curNote,
      pinned: false
    };
    const new_notes = [...notes,note]
    setNotes(new_notes);
    setShow(false);
    setCurTitle("");
    setCurNote("");
  }
  function deleteNote(indexToDelete){
    const newNotes = notes.filter((item, index) => index !== indexToDelete);
    setNotes(newNotes);
  }
  function savingEdit(){
    if(editTitle.trim() === "" || editContent.trim() === ""){
      return;
    }
    const newNotes = [...notes];
    newNotes[editIndex] = {
      title: editTitle,
      content: editContent,
      pinned: newNotes[editIndex].pinned
    };
    setNotes(newNotes);
    setEditIndex(-1);
    setEditTitle("");
    setEditContent("");
  }
  const filteredNotes = notes.map((note, index) => ({ ...note, originalIndex: index })).filter((note) =>
    note.title.toLowerCase().includes(searchText.toLowerCase()) ||
    note.content.toLowerCase().includes(searchText.toLowerCase())
  );
  const pinnedNotes = filteredNotes.filter(note => note.pinned);
  const unpinnedNotes = filteredNotes.filter(note => !note.pinned);
  const finalNotes = [...pinnedNotes, ...unpinnedNotes];
  function pinNote(index){
    const newNotes = [...notes];

    newNotes[index].pinned = !newNotes[index].pinned;

    setNotes(newNotes);
  }
  return(
    <div className = "container">
      <div className = "heading">
        <p>Notes App</p>
      </div>
      <div className = "addNotesSection">
        <button id = "plusButton" onClick = {displayInputBox} >+</button>
      </div>
      <div>
        <input
        placeholder="Search notes"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        />
        <button onClick={() => setSearchText("")}>
          Clear
        </button>
      </div>
      { show && (
        <div className = "inputBox">
          <input className="titleBox" placeholder="enter title" value={curTitle} onChange = {(event)=>{
              setCurTitle(event.target.value);
          }}></input>
          <input className="noteBox" placeholder="enter note" value={curNote} onChange = {(event)=>{
              setCurNote(event.target.value);
          }}></input>
          <button onClick = {addNotes}>submit</button>
        </div>
        )
      }
      {
        finalNotes.map((note) => (
        <div className = "displayTasks" key={note.originalIndex}>
            {
              editIndex === note.originalIndex ? (
                <div>
                <input
                  value={editTitle}
                  placeholder="edit title"
                  onChange={(e) => {
                  setEditTitle(e.target.value);
              }}
              />
              <input
                  value={editContent}
                  placeholder="edit note"
                  onChange={(e) => {
                  setEditContent(e.target.value);
              }}
              />
              </div>
              ) : (
              <div>
                <div className="title">
                  <p>{note.title}</p>
                </div>
                <div className="content">
                  <p>{note.content}</p>
                </div>
              </div>
              )
            }
            <div className = "taskButtons">
            {
              editIndex === note.originalIndex ? (
              <button onClick = {savingEdit}>Save</button>
              ) : (
              <button onClick={() => {
                setShow(false);
                setEditIndex(note.originalIndex);
                setEditTitle(note.title);
                setEditContent(note.content);
              }}>
              Edit
              </button>
              )
            }
            <button onClick={()=>{
              pinNote(note.originalIndex);
              }}>
              {note.pinned ? "unpin" : "pin"}
            </button>
            <button onClick = {()=>{
              deleteNote(note.originalIndex);
            }}>Delete</button>
            </div>
        </div>
          ))
      }
    </div>
  );
}
export default App;