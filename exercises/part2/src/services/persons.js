import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  let request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  let request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

export default { getAll, create };
