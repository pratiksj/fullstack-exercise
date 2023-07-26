const Note = ({ note, toggleImportance }) => {
  const lable = note.important ? "make not important" : "make important";
  return (
    <div>
      <li>{note.content}</li>
      <button onClick={toggleImportance}>{lable}</button>
    </div>
  );
};

export default Note;
