import axios from "axios";
import { useState, useEffect } from "react";
import Note from "./components/Note";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("new note..");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/notes").then((response) => {
      console.log("promise fulfilled");
      setNotes(response.data);
    });
  }, []);
  console.log(notes, "array");
  //console.log("render", no, "notes");

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      data: new Date().toISOString(),
      important: Math.random() < 0.5 ? true : false,
      id: notes.length + 1,
    };
    axios.post("http://localhost:3001/notes", noteObject).then((response) => {
      setNotes(notes.concat(noteObject));
      setNewNote("");
    });
  };
  const handleOnChange = (event) => {
    setNewNote(event.target.value);
  };

  const notesToshow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToshow.map((note) => (
          <li key={note.id}>
            <Note key={note.id} note={note} />
          </li>
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleOnChange} />
        <button>save</button>
      </form>
    </div>
  );
};

export default App;
