import axios from "axios";
const baseUrl = "http://localhost:3001/notes";

const getAll = () => {
  console.log("i am getAl");
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

export default {
  getAll: getAll,
  create: create,
  update: update,
};
