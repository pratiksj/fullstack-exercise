const dummy = (blogs) => {
    let value = 1
    return value

}

const totalLikes = (blogs) => {

    let total = blogs.reduce((accumulator, currentVal) => currentVal.likes + accumulator, 0)
    return total
}

module.exports = {
    dummy,
    totalLikes
}