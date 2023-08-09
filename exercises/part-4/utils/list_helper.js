const _ = require('lodash')

const dummy = (blogs) => {
    let value = 1
    return value

}

const totalLikes = (blogs) => {

    let total = blogs.reduce((accumulator, currentVal) => currentVal.likes + accumulator, 0)
    return total
}
const mostLikes = (blogs) => {
    let mostLi = blogs.reduce((maxItem, currentItem) => {
        return currentItem.likes > maxItem ? currentItem.likes : maxItem
    }, 0)

    return mostLi
}

const mostBlog = (blogs) => {
    const groupedbyAuthor = _.groupBy(blogs, 'author')
    const authorWithBlogCount = _.map(groupedbyAuthor, (blogs, author) => ({
        author,
        blogs: blogs.length
    }))
    //console.log(authorWithBlogCount, 'testingcount')
    const authorWithBlog = _.maxBy(authorWithBlogCount, 'blogs')
    //console.log(authorWithBlog, 'last outcome')
    return authorWithBlog


}

const massLikes = (blogs) => {
    const groupByAuthorName = _.groupBy(blogs, 'author')
    //console.log(groupByAuthorName, 'first')
    const authorWithLikes = _.map(groupByAuthorName, (blogs, author) => ({
        author,
        likes: _.map(blogs, 'likes')
    }))
    const sumOfLikes = _.map(authorWithLikes, (author) => (
        {
            author: author.author,
            likes: _.sumBy(author.likes)
        }
    )

    )
    //console.log(sumOfLikes, 'she')
    const authorWithBlog = _.maxBy(sumOfLikes, 'likes')
    //console.log(authorWithBlog, 'sim')
    return authorWithBlog

}

module.exports = {
    dummy,
    totalLikes,
    mostLikes,
    mostBlog,
    massLikes
}