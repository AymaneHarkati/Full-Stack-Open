import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

export const getAll = async () =>
  axios.get(baseUrl).then((result) => result.data);

export const createAnecdote = (newNote) =>{
  if (newNote.content.length <= 5) {
    throw new Error("too short anecdote")
  }
  return axios.post(baseUrl, newNote).then((res) => res.data);

}

export const updateAnecdote = (updatedNote) =>
  axios
    .put(`${baseUrl}/${updatedNote.id}`, updatedNote)
    .then((res) => res.data);
