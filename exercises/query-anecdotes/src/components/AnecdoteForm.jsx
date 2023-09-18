import  anecdoteService from '../services/anecdote'
import { useMutation,useQueryClient } from '@tanstack/react-query'
import { useMessageDispatch } from '../CounterContext'

const AnecdoteForm = () => {
  const dispatch = useMessageDispatch()
  const queryClient = useQueryClient()
  const newAnecdoteMutation =useMutation(anecdoteService.create,{
 onSuccess:(newAnecdote)=>{

    const anecdotes = queryClient.getQueryData(['anecdote'])
    
    queryClient.setQueryData(['anecdote'],anecdotes.concat(newAnecdote))
     dispatch({type:'NOTI',payload:`${newAnecdote.content} has added`})
     setTimeout(()=>{
      dispatch({type:'NOTI',payload:null})
     },2000)
 },
//  onError:(error)=>{
//   console.log(error,'error')
//  dispatch({type:'NOTI',payload:`${error}`})
//  }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
  if(content.length>=5){

      newAnecdoteMutation.mutate({content,votes:0})
    } else{
      dispatch({type:'NOTI',payload:'content must contain 5 character'})
      setTimeout(()=>{
        dispatch({type:'NOTI',payload:null})
      },3000)
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
