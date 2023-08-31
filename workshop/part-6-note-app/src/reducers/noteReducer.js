import { createSlice } from '@reduxjs/toolkit'
import noteService from '../services/notes'




const noteSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        createNote(state, action) {
            state.push(action.payload)
        },
        toggleImportanceOf(state, action) {
            const object = action.payload
            return state.map(note =>
                note.id !== object.id ? note : object
            )
        },
        appendNote(state, action) {
            state.push(action.payload)
        },
        setNotes(state, action) {
            return action.payload
        }
    },
})







export const { createNote, toggleImportanceOf, appendNote, setNotes } = noteSlice.actions
export default noteSlice.reducer

export const initializeNote = () => {
    return async dispatch => {
        const notes = await noteService.getAll()
        dispatch(setNotes(notes))
    }
}

