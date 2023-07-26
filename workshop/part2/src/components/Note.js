const Note = ({ note, toggleImportance, noteToDelete }) => {
  const lable = note.important ? "make not important" : "make important";
  return (
    <div>
      <li>{note.content}</li>
      <button onClick={toggleImportance}>{lable}</button>
      <button onClick={() => noteToDelete(note.id)}>delete</button>
    </div>
  );
};

export default Note;
