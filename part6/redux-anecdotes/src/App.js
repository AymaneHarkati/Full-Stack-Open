import AnecdotesForm from "./components/AnecdoteFrom";
import AnecdoteList from "./components/AnecdoteList";
import FilterAnecdotes from "./components/FilterAnecdotes";
import React from "react";
import Notification from "./components/Notification";
import { useQuery } from "react-query";
import { getAll } from "./services/anecdotesService";
import { useReducer } from "react";
const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return action.payload;
    default:
      return null;
  }
};
const App = () => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );
  const result = useQuery(["anecdotes"], () => getAll(), {
    retry: false,
  });
  if (!result.isSuccess) {
    return <div>anecdote services not available due to problems in server</div>;
  }
  const anecdotes = result.data;
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification notification={notification} />
      <FilterAnecdotes />
      <AnecdoteList
        anecdotes={anecdotes}
        notificationDisp={notificationDispatch}
      />
      <AnecdotesForm notificationDisp={notificationDispatch} />
    </div>
  );
};

export default App;
