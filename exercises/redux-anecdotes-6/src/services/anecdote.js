import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const notes = await axios.get(baseUrl)
    console.log(notes, 'from service')
    return notes.data
}

export default { getAll }