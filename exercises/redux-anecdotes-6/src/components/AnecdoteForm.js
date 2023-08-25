import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(anecdote))
        dispatch(showNotification(`${anecdote} has added`))
        setTimeout(() => {
            dispatch(showNotification(null))
        }, 5000)

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
