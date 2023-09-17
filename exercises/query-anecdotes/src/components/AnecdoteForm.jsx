import  anecdoteService from '../services/anecdote'
import { useMutation,useQueryClient } from '@tanstack/react-query'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation =useMutation(anecdoteService.create,{
 onSuccess:(newAnecdote)=>{

    const anecdotes = queryClient.getQueryData(['anecdote'])
    console.log(anecdotes,'this and that')
    queryClient.setQueryData(['anecdote'],anecdotes.concat(newAnecdote))
  
  //queryClient.invalidateQueries({queryKey:['anecdote']})
 },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if(content.length>=5){

      newAnecdoteMutation.mutate({content,votes:0})
    } else{
      throw new Error('Anecdote must contain at least 5 character')
    }
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
