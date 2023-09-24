 import { useState, useEffect } from 'react'
import axios from 'axios'
import useField from './Hooks/useField'


const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

 useEffect(()=>{
 axios.get(baseUrl).then((result)=>{
  setResources(result.data)
 })
 },[])

  const create = async (resource) => {
   const response =  await axios.post(baseUrl,resource)
   setResources([...resources,response.data])
  }

  const service = {
   create
  }

  return [
    resources, service
  ]
}


const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3001/notes')
  const [persons, personService] = useResource('http://localhost:3002/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    content.onChange({target:{value:''}})

  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    name.onChange({target:{value:''}})
    number.onChange({target:{value:''}})
  }
  

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input type={content.type} value={content.value} onChange={content.onChange}/>
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App
