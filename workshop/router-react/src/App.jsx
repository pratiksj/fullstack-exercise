import Note from "./components/Note";
import User from "./components/User";
import Home from "./components/Home";
import Notes from "./components/Notes";
import Login from "./components/Login";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useMatch,
} from "react-router-dom";

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: "HTML is easy",
      important: true,
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false,
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true,
    },
  ]);
  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
  };

  const match = useMatch("/notes/:id");

  const singleNote = match
    ? notes.find((note) => note.id === Number(match.params.id))
    : null;

  const padding = {
    padding: 5,
  };

  return (
    <div>
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/notes">
          notes
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {user ? (
          <em>{user} logged in</em>
        ) : (
          <Link style={padding} to="/login">
            login
          </Link>
        )}
      </div>

      <Routes>
        <Route path="/notes/:id" element={<Note notes={singleNote} />} />
        <Route path="/notes" element={<Notes note={notes} />} />
        <Route
          path="/users"
          element={user ? <User /> : <Navigate replace to="/login" />}
        />
        <Route path="/login" element={<Login onLogin={login} />} />

        <Route path="/" element={<Home />} />
      </Routes>

      <div>
        <i>Note app, Department of Computer Science 2023</i>
      </div>
    </div>
  );
};

export default App;
