import React from 'react'
import { useState } from 'react'

export const NoteForm = ({ create }) => {
    const [newNote, setNewNote] = useState("");

    const addNote = (event) => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            data: new Date().toISOString(),
            important: Math.random() < 0.5 ? true : false,
        };
        create(noteObject)
        setNewNote('')
    };
    const handleOnChange = (event) => {
        setNewNote(event.target.value);
    };

    return (
        <div className='formDiv'>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleOnChange} />
                <button>save</button>
            </form>
        </div>
    )

}
