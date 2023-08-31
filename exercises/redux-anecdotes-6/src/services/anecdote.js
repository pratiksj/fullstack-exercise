import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const notes = await axios.get(baseUrl)

    return notes.data
}

const create = async (content) => {
    const response = await axios.post(baseUrl, content)
    return response.data
}

export default { getAll, create }