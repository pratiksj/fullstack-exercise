import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery,useMutation,useQueryClient} from '@tanstack/react-query'
import anecdoteService from './services/anecdote'

const App = () => {
  const queryClient = useQueryClient()
  const updateAnecdoteMutation= useMutation(anecdoteService.update,{
    onSuccess:()=>{
      queryClient.invalidateQueries('anecdote')
    },
  })

const {isLoading,isError,data}=useQuery({
  queryKey:['anecdote'],
  queryFn:anecdoteService.getAll,
  retry:false
})

  
  if ( isLoading ) {
    return <div>loading data...</div>
  }

  if(isError){
  return <div>anecdote service not avaible due to problem in server</div>
  }

  


  const handleVote = (anecdote) => {
    console.log(anecdote,'vote')
    updateAnecdoteMutation.mutate({...anecdote,votes:anecdote.votes+1})
  }

  
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
