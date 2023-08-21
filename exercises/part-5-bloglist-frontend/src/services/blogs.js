import axios from 'axios'
const baseUrl = '/api/blogs'



const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObj, token) => {
  const config = {
    headers: { authorization: `Bearer ${token}` }
  }
  console.log(config, 'from create')
  console.log(newObj, 'obj from service')
  const request = await axios.post(baseUrl, newObj, config)
  console.log(request.data, 'from service')
  return request.data
}

const update = async (newObj, id, token) => {
  const config = {
    headers: { authorization: `Bearer ${token}` }
  }
  const request = await axios.put(`${baseUrl}/${id}`, newObj, config)
  return request.data

}

export default { getAll, create, update }