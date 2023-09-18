import {
    useParams
  } from 'react-router-dom'
  

const Anecdote = ({ anecdote}) => {
    const id = useParams().id
    const anecodeId = anecdote.find(n => n.id === Number(id)) 
    return (
      <div>
        <h2>{anecodeId.content}</h2>
        <div>
                    has {anecodeId.votes}
                    <button>vote</button>
                
                </div>
        
        
      </div>
    )
  }

  export default Anecdote