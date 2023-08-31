import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdotes(anecdote))
        dispatch(setNotification(`${anecdote} has added`, 10))
    }
    return (
        <div>
            <form onSubmit={addAnecdote}>
                <input name='anecdote' />
                <button type='submit' >create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
