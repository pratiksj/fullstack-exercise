import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteServices from "./services/notes";
import loginServices from './services/login'
import Notification from "./components/Notification";
import "./index.css";
import Footer from "./components/Footer";

const App = () => {
  const [notes, setNotes] = useState(null);
  const [newNote, setNewNote] = useState("new note..");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log("effect");

    noteServices
      .getAll()
      .then((response) => setNotes(response))
      .catch((error) => {
        console.log("fail request");
      });
  }, []);
  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      noteServices.setToken(user.token)
    }
  }, [])


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
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginServices.login({ username, password })
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      noteServices.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
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

    noteServices.remove(id).then((response) => {
      setNotes(notes.filter((note) => note.id !== id));
    });
  };

  const loginForm = () => {
    return (

      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />

        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={(event) => setPassword(event.target.value)}
          />

        </div>
        <button type="submit">login</button>
      </form>
    )
  }

  const noteForm = () => {
    return (
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleOnChange} />
        <button>save</button>
      </form>
    )
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {!user ?
        loginForm() : <div>
          <p>{user.name}logged in</p>
          {noteForm()}
        </div>
      }

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

      <Footer />
    </div>
  );
};

export default App;
