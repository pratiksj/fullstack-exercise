import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(anecdote))

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
