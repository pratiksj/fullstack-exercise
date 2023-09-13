import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getNotes = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}


const create = async (newNote) => {
    console.log(newNote, 'from service')
    const response = await axios.post(baseUrl, newNote)
    return response.data
}


const update = async (objToUpdate) => {
    const response = await axios.put(`${baseUrl}/${objToUpdate.id}`, objToUpdate)
    return response.data
}

export default { getNotes, update, create }

