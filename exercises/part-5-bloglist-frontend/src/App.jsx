import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification  from './components/Notification'
import Togglable from './components/Togglable'
import  BlogForm  from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
    let loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      let user = JSON.parse(loggedInUser)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`${user.name} has successfully  log into application`)
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    } catch (exception) {
      setMessage(exception.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    }
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    )
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }
  const addBlog = async (newObj) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(newObj, user.token)
      setBlogs(blogs.concat(newBlog))
      setMessage(`${newBlog.title} has added by ${user.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    } catch (exception) {
      setMessage(exception.response.data.error)
    }
  }

  const increaseLikes = async (id) => {
    const blogToUpdate = blogs.find((blog) => blog.id === id)
    const objToUpdate = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes,
    }

    try {
      const newBlog = await blogService.update(objToUpdate, id, user.token)

      const updateState = blogs.map((blog) =>
        blog.id === id ? newBlog : blog
      )
      setBlogs(updateState)
      setMessage(`${blogToUpdate.title} has updated`)
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    } catch (exception) {
      console.log('wrong')
    }
  }
  const remove = async (obId) => {
    const checkId = blogs.find((data) => data.id === obId)
    try {
      if (window.confirm(`Are you sure to delete ${checkId.title}`)) {
        await blogService.remove(obId, user.token)
        setBlogs(blogs.filter((blog) => blog.id !== obId))
        setMessage(`${checkId.title} has deleted successfully`)
        setTimeout(() => {
          setMessage(null)
        }, 2000)
      }
    } catch (exception) {
      setMessage(exception.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    }
  }

  const sorting = blogs.sort((a, b) => b.likes - a.likes)

  const blogForm = () => {
    return (
      <Togglable buttonLabel="create new Blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      {user === null ? (
        <div>log into application{loginForm()} </div>
      ) : (
        <div>
          {user.name} has logged in<button onClick={logOut}>logOut</button>
          {blogForm()}
          {sorting.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              update={increaseLikes}
              remove={remove}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
