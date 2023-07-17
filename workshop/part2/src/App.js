import { useState } from "react";
import Note from "./components/Note";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("new note..");
  const [showAll, setShowAll] = useState(true);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      data: new Date().toISOString(),
      important: Math.random() < 0.5 ? true : false,
      id: notes.length + 1,
    };
    setNotes(notes.concat(noteObject));

    setNewNote("");
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
