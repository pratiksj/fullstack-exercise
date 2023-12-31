//import { useState } from 'react'
import { useField } from '../Hooks'

const CreateNew = (props) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')
  
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content:content.value,
        author:author.value,
        info:info.value,
        votes: 0
      })
    }
  const onChange=()=>{
   content.removeAll()
   author.removeAll()
   info.removeAll()
  }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input type={content.type} value={content.value} onChange={content.onChange} />
          </div>
          <div>
            author
            <input type={author.type} value={author.value} onChange={author.onChange}  />
          </div>
          <div>
            url for more info
            <input type={info.type} value={info.value} onChange={info.onChange} />
          </div>
          <button>create</button>
      
        </form>
        <button  onClick={onChange}>reset</button>
      </div>
    )
  
  }

  export default CreateNew