import noteService from "./services/notes";

import { useQuery, useMutation, useQueryClient } from "react-query";
const App = () => {
  const queryClient = useQueryClient();
  const newNoteMutation = useMutation(noteService.create, {
    onSuccess: (newNote) => {
      console.log(newNote, "onsuccess");
      //const notes = queryClient.getQueryData("notes");
      const notes = queryClient.getQueryData("notes");
      console.log(notes, "note from server");
      queryClient.setQueryData("notes", notes.concat(newNote));
    },
  });
  const updateNoteMutation = useMutation(noteService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
      //queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";
    newNoteMutation.mutate({ content, important: true });
  };

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({ ...note, important: !note.important });
  };

  //const notes = [];
  const result = useQuery({
    queryKey: ["notes"],
    queryFn: noteService.getNotes,
    //refetchOnWindowFocus: false,
  });
  console.log(JSON.parse(JSON.stringify(result)), "query");
  const notes = result.data;
  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="content" />
        <button type="submit">add</button>
      </form>
      {notes.map((note) => (
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content}
          <strong> {note.important ? "important" : ""}</strong>
        </li>
      ))}
    </div>
  );
};

export default App;
