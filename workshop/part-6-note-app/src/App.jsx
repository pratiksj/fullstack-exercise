import NewNote from "./components/NewNote";
import { useEffect } from "react";
import Notes from "./components/Notes";
import { setNotes } from "./reducers/noteReducer";
import noteService from "./services/notes";
import VisibilityFilter from "./components/VisibilityFilter";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    noteService.getAll().then((notes) => {
      dispatch(setNotes(notes));
    });
  }, []);

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
