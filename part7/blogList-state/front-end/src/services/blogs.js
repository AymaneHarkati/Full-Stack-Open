import axios from "axios";
const baseUrl = "http://localhost:3001/api/blogs";
let token = null;

const setToken = (newToken) => {
  token = "bearer " + newToken;
};
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  console.log(response.data);
  return response.data;
};

const update = async (id, updateBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log(updateBlog);
  const response = await axios.put(`${baseUrl}/${id}`, updateBlog, config);
  return response.data;
};
const remove = async (id) => {
  console.log(id);
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, update, remove, token };
