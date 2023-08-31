
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { useEffect } from 'react'
import Notification from './components/Notification'
import { getAnecdote } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAnecdote())
  }, [])


  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />

    </div>
  )
}

export default App