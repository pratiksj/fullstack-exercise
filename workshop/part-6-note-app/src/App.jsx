import NewNote from "./components/NewNote";
import { useEffect } from "react";
import Notes from "./components/Notes";
import { initializeNote } from "./reducers/noteReducer";
import VisibilityFilter from "./components/VisibilityFilter";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeNote());
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
