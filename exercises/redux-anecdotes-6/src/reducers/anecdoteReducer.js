/* eslint-disable default-case */
import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

//const initialState = anecdotesAtStart.map(asObject)




const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push(content)
    },
    likeVote(state, action) {
      const anecdoteId = action.payload
      const findAnecdote = state.find((data) => data.id === anecdoteId)
      return state.map((data) => data.id === anecdoteId ? { ...findAnecdote, votes: findAnecdote.votes + 1 } : data)
    },
    removeAnecdote(state, action) {
      return state.filter((data) => data.id !== action.payload)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    }

  }
})


export const { createAnecdote, likeVote, appendAnecdote, setAnecdote, removeAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const getAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const addAnecdotes = (content) => {
  return async dispatch => {
    const newObj = {
      content,
      votes: 0
    }
    const anecdote = await anecdoteService.create(newObj)

    dispatch(createAnecdote(anecdote))
  }
}

export const likeAnecdote = (id, obj) => {
  return async dispatch => {
    const newObj = { ...obj, votes: obj.votes + 1 }
    await anecdoteService.update(id, newObj)
    dispatch(likeVote(id))

  }
}

export const deleteAnecdote = (id) => {
  return async dispatch => {
    if (window.confirm('Are are sure,to delete this anecdote')) {

      await anecdoteService.remove(id)
      dispatch(removeAnecdote(id))
    }

  }
}

