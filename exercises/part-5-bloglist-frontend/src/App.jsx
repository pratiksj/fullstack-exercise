import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  
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

  }catch(exception){
  console.log('wrong credential')
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

  return (
    <div>
      <h2>blogs</h2>
      {user===null?<div>log into application{loginForm()} </div>:<div>{user.name} has logged in<button onClick={logOut}>logOut</button> {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}</div>}
      
    </div>
  )
}

export default App