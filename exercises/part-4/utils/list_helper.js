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

module.exports = {
    dummy,
    totalLikes,
    mostLikes
}