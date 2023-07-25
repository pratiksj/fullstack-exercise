import { useState } from "react";

const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes contains are</h1>
      {notes.length > 0 ? (
        notes.map((note) => {
          return <div key={note.id}>{note.content}</div>;
        })
      ) : (
        <div>ther is no data uptill now</div>
      )}
    </div>
  );
};

export default App;
