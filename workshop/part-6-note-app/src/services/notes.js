import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (newNote) => {
    const response = await axios.post(baseUrl, newNote)
    return response.data
}

const update = async (id, objToUpdate) => {
    const response = await axios.put(`${baseUrl}/${id}`, objToUpdate)
    return response.data
}

export default { getAll, create, update }

