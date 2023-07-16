import { useState } from "react";

const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes contain at 0 index</h1>
      <p>{notes[0].content}</p>
    </div>
  );
};

export default App;
