import { createSlice } from "@reduxjs/toolkit";
//import anecdotesService from "../services/anecdotesService";

const anecdote = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdotes(state, action) {
      state.push(action.payload);
    },
    addVote(state, action) {
      const oldQuote = state.find((quote) => quote.id === action.payload);
      const newQuote = { ...oldQuote, votes: oldQuote.votes + 1 };
      return state.map((quote) =>
        quote.id !== action.payload ? quote : newQuote
      );
    },
    setNotes(state, action) {
      return action.payload;
    },
  },
});
export const { appendAnecdotes, addVote, setNotes } = anecdote.actions;
export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setNotes(anecdotes));
  };
};
export const createNote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.add(content);
    dispatch(appendAnecdotes(newAnecdote));
  };
};
export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdotes = await anecdotesService.update(anecdote);
    dispatch(addVote(updatedAnecdotes.id))
  };
};
export default anecdote.reducer;
