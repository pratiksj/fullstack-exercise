import { useState, useEffect, useRef } from "react";
import Note from "./components/Note";
import noteServices from "./services/notes";
import loginServices from './services/login'
import Notification from "./components/Notification";
import "./index.css";
import Footer from "./components/Footer";
import { LoginFrom } from "./components/LoginFrom";
import { Togglable } from "./components/Togglable";
import { NoteForm } from "./components/NoteForm";

const App = () => {
  const [notes, setNotes] = useState(null);

  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const noteFormRef = useRef()


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


  const notesToshow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const toggleImportanceOf = async (id) => {
    try {


      const note = notes.find((n) => n.id === id);
      const noteTochange = { ...note, important: !note.important };
      const updatedNote = await noteServices.update(id, noteTochange)
      setNotes(notes.map((note) => note.id !== id ? note : updatedNote))

    }
    catch (exception) {
      setErrorMessage(

      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      // setNotes(notes.filter((note) => note.id !== id));
    };
  };
  const noteToDelete = async (id) => {
    try {
      await noteServices.remove(id)
      setNotes(notes.filter((note) => note.id !== id))
    } catch (exception) {
      setErrorMessage(exception.response.data.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }


  };

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()


    noteServices.create(noteObject).then((response) => {
      setNotes(notes.concat(response));

    }).catch((error) => {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    });
  };
  const propsCollection = {
    username, setUsername, password, setPassword, handleLogin
  }


  const loginForm = () => {


    return (
      <div>

        <div>
          <Togglable buttonLabel='login'>
            <LoginFrom
              collection={propsCollection}
            />
          </Togglable>

        </div>
      </div>
    )
  }


  const noteForm = () => {
    return (
      <Togglable buttonLabel='create new note' ref={noteFormRef}>
        <NoteForm create={addNote} />
      </Togglable>

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
