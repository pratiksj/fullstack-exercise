const Note = ({ note, toggleImportance }) => {
  const lable = note.important ? "make not important" : "make important";
  return (

    <li className="note"><span>{note.content}</span>
      <button onClick={toggleImportance}>{lable}</button>
      {/* <div><button onClick={() => noteToDelete(note.id)}>delete</button></div> */}
    </li>

  );
};

export default Note;
