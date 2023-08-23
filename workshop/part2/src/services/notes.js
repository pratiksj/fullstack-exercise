import axios from "axios";
//const baseUrl = "http://localhost:3001/api/notes"; 
const baseUrl = '/api/notes'

let token = null

const setToken = (newToken) => {

  token = `Bearer ${newToken}`
}

const getAll = () => {

  let request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const config = {
    headers: { authorization: token },
  }

  let request = axios.post(baseUrl, newObject, config);

  return request.then((response) => response.data);
};

const update = async (id, newObject) => {
  const config = {
    headers: { authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data
};

const remove = (id) => {
  const config = {
    headers: { authorization: token },
  }
  return axios.delete(`${baseUrl}/${id}`, config);
};

export default {
  getAll,
  create,
  update,
  remove,
  setToken,
};
