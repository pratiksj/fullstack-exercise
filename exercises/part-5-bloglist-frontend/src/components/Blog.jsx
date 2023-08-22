import { useState } from 'react'
import BlogDetails from './BlogDetails'
const Blog = ({ blog, user, update, remove }) => {
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const getToRemove = (id) => {
    remove(id)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      {visible ? (
        <div>
          <BlogDetails blog={blog} user={user} update={update} />
          <button onClick={toggleVisibility}>Hide</button>
          {user.id === (blog.user.id || blog.user) && (
            <button
              onClick={() => {
                getToRemove(blog.id)
              }}
            >
              Delete
            </button>
          )}
        </div>
      ) : (
        <button onClick={toggleVisibility}>view</button>
      )}
    </div>
  )
}

export default Blog
