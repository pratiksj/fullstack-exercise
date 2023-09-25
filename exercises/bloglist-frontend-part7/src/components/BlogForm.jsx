import React from 'react'
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title,setTitle]= useState('')
  const [author,setAuthor]=useState('')
  const [url,setUrl]= useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const newObj = {
      title:title,
      author:author,
      url:url
    }
    createBlog(newObj)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <form onSubmit={addBlog}>
      <div>
    title:
        <input id='title' placeholder='title' type='text' value={title} name='Title' onChange={({ target }) => setTitle(target.value)}/>
      </div>
      <div>
    author:
        <input id='author' placeholder='author'  type='text' value={author} name='Author' onChange={(event) => setAuthor( event.target.value)}/>
      </div>
      <div>
    Url:
        <input id='url' placeholder='url' type='text' value={url} name='Url' onChange={({ target }) => setUrl(target.value)}/>
      </div>
      <button id='create' type='submit'>create</button>
    </form>
  )
}

export default BlogForm
