import axios from "axios";

const baseUrl = "http://localhost:3001/api/user";

const getAll = () => {
  return axios
    .get(baseUrl)
    .then((response) => response.data)
    .catch((e) => console.log(e));
};

export default { getAll };
