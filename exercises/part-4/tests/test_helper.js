const Blog = require("../models/blog")

const initialBlogs = [
    {
        title: 'HTML is easy',
        author: 'pratiksha',
        url: 'www.kathmandupostcom',
        likes: 12
    },
    {
        title: 'javascript is easy',
        author: 'usha',
        url: 'www.onlinekhabar.com',
        likes: 20
    },
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())

}

module.exports = {
    initialBlogs, blogsInDb
}