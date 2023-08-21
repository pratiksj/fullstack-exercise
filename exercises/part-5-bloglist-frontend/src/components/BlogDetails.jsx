import React from 'react'

export const BlogDetails = ({blog,user,update}) => {
    const idOfLikes=(id)=>{

       update(id)
    }
  return (
    <div>
    <div>{blog.author}</div>
    <div>{blog.url}</div>
    <div>{blog.likes}</div><button onClick={()=>idOfLikes(blog.id)}>likes</button>
    <div>{user.name}</div>
    </div>
  )
}
