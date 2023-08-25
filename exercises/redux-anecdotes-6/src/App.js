import { useSelector, useDispatch } from 'react-redux'
import { likeVote, createAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  const filterVote = anecdotes.sort((a, b) => b.votes - a.votes)

  const vote = (id) => {
    dispatch(likeVote(id))
  }
  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(anecdote))

  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {filterVote.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type='submit' >create</button>
      </form>
    </div>
  )
}

export default App