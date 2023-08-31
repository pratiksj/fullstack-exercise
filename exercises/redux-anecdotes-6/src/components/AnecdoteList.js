import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { likeAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const secondFilter = useSelector(state => state.filter)
    const filter = anecdotes.filter((data) => data.content.toLowerCase().includes(secondFilter))



    const dispatch = useDispatch()
    const filterVote = filter.sort((a, b) => b.votes - a.votes)
    const vote = (id) => {
        const findAnecdote = filter.find((anecdote) => anecdote.id === id)
        dispatch(likeAnecdote(id, findAnecdote))
        dispatch(setNotification(`${findAnecdote.content} has been liked`, 2))
    }

    return (
        <div>{filterVote.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
            </div>
        )}</div>
    )
}

export default AnecdoteList
