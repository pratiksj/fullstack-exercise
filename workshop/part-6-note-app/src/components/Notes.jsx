import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";
import noteService from "../services/notes";
import Note from "./Note";

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => {
    if (state.filter === "ALL") {
      return state.notes;
    }
    return state.filter === "IMPORTANT"
      ? state.notes.filter((note) => note.important)
      : state.notes.filter((note) => !note.important);
  });
  const update = async (id) => {
    const findNote = notes.find((note) => note.id == id);
    const newObj = {
      ...findNote,
      important: !findNote.important,
    };
    const updatedNote = await noteService.update(id, newObj);
    dispatch(toggleImportanceOf(updatedNote));
  };

  return (
    <ul>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          // handleClick={() => dispatch(toggleImportanceOf(note.id))}
          handleClick={() => update(note.id)}
        />
      ))}
    </ul>
  );
};

export default Notes;
