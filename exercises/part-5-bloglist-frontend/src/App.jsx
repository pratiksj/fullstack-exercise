import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { Notification } from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title,setTitle]= useState('')
  const [author,setAuthor]=useState('')
  const [message,setMessage]= useState(null)
  const [url,setUrl]= useState('')
  const [username,setUsername] =  useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    ) 
  let loggedInUser = window.localStorage.getItem('loggedInUser')
  if(loggedInUser){
    let user = JSON.parse(loggedInUser)
   setUser(user)
  } 
  }, [])


const handleLogin= async(event)=>{
   event.preventDefault()
   try{
const user = await loginService.login({username,password})
window.localStorage.setItem('loggedInUser',JSON.stringify(user))
setUser(user)
setUsername('')
setPassword('')
setMessage(`${user.name} has successfully  log into application`)
setTimeout(()=>{
  setMessage(null)
},2000)

  }catch(exception){
   setMessage(exception.response.data.error)
   setTimeout(()=>{
    setMessage(null)
   },2000)
   } 
  }

  const loginForm=()=>{
    return(
      <form onSubmit={handleLogin}>
<div>
  username 
  <input type='text' value={username} name='username' onChange={({target})=>setUsername(target.value)}/>
</div>
<div>
  password 
  <input type='text' value={password} name='password' onChange={({target})=>setPassword(target.value)}/>
</div>
<button type='submit'>login</button>
      </form>
    )
  }

  const logOut=()=>{
  window.localStorage.removeItem('loggedInUser')
  setUser(null)
  
  }
  const addBlog = async(event)=>{
    event.preventDefault()
    const newObj = {
      title:title,
      author:author,
      url:url
    }
  try{const newBlog = await blogService.create(newObj,user.token)
    setBlogs(blogs.concat(newBlog))
    setMessage(`${newBlog.title} has added by ${user.name}`)
    setTimeout(()=>{
      setMessage(null)
    },2000)
  
  }
    
    catch(exception){
   setMessage(exception.response.data.error)

    }
  
  }
  const blogForm =()=>{
    return(
      <form onSubmit={addBlog}>
     <div>
  title:
  <input type='text' value={title} name='Title' onChange={({target})=>setTitle(target.value)}/>
</div>
<div>
  author:
  <input type='text' value={author} name='Author' onChange={(event)=>setAuthor( event.target.value)}/>
</div>
<div>
  Url:
  <input type='text' value={url} name='Url' onChange={({target})=>setUrl(target.value)}/>
</div>
<button type='submit'>create</button>
      </form>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message}/>
      {user===null?<div>log into application{loginForm()} </div>:<div>{user.name} has logged in<button onClick={logOut}>logOut</button>{blogForm()} {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}</div>}
      
    </div>
  )
}

export default App