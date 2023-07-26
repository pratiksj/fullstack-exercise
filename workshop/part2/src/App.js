import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteServices from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("new note..");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log("effect");

    noteServices
      .getAll()
      .then((response) => setNotes(response))
      .catch((error) => {
        console.log("fail request");
      });
  }, []);
  console.log(notes, "array");

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      data: new Date().toISOString(),
      important: Math.random() < 0.5 ? true : false,
      id: notes.length + 1,
    };
    noteServices.create(noteObject).then((response) => {
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

  const toggleImportanceOf = (id) => {
    //const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((n) => n.id === id);
    const noteTochange = { ...note, important: !note.important };
    noteServices.update(id, noteTochange).then((response) => {
      setNotes(notes.map((n) => (n.id !== id ? n : response.data)));
    });
  };

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
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
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
