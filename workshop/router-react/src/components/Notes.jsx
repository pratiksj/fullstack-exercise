import { Link } from "react-router-dom";

const Note = ({ note, toggleImportance }) => {
  console.log(note, "from Note");
  //const lable = note.important ? "make not important" : "make important";
  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {note.map((note) => (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Note;
