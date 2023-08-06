import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteServices from "./services/notes";
import Notification from "./components/Notification";
import "./index.css";
import Footer from "./components/Footer";

const App = () => {
  const [notes, setNotes] = useState(null);
  const [newNote, setNewNote] = useState("new note..");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

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
    };
    noteServices.create(noteObject).then((response) => {
      setNotes(notes.concat(response));
      setNewNote("");
    }).catch((error) => {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    });
  };
  const handleOnChange = (event) => {
    setNewNote(event.target.value);
  };

  const notesToshow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const toggleImportanceOf = (id) => {

    const note = notes.find((n) => n.id === id);
    const noteTochange = { ...note, important: !note.important };
    noteServices
      .update(id, noteTochange)
      .then((response) => {
        setNotes(notes.map((n) => (n.id !== id ? n : response.data)));
      })
      .catch((error) => {
        setErrorMessage(
          `the note '${note.content}' was already deleted from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((note) => note.id !== id));
      });
  };
  const noteToDelete = (id) => {
    console.log(id, "delete");
    noteServices.remove(id).then((response) => {
      setNotes(notes.filter((note) => note.id !== id));
    });
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {!notes ? null : notesToshow.map((note) => (
          <li key={note.id}>
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
              noteToDelete={noteToDelete}
            />
          </li>
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleOnChange} />
        <button>save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
