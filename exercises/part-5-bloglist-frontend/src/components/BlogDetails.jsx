import React from 'react'

const BlogDetails = ({ blog, user, update }) => {
  const idOfLikes = (id) => {

    update(id)
  }
  return (
    <div>
      <div className='author'>{blog.author}</div>
      <div className='url'>{blog.url}</div>
      <div className='likes'>{blog.likes}</div>
      <button onClick={() => idOfLikes(blog.id)}>likes</button>
    </div>
  )
}

export default BlogDetails
