import axios from "axios";
//const baseUrl = "http://localhost:3001/api/notes"; 
const baseUrl = '/api/notes'

const getAll = () => {

  let request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  let request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {
  getAll,
  create,
  update,
  remove,
};
