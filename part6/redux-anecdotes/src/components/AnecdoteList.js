import React from "react";
import { useQueryClient, useMutation } from "react-query";
import { updateAnecdote } from "../services/anecdotesService";
const AnecdoteList = ({ anecdotes, notificationDisp }) => {
  const queryClient = useQueryClient();
  const mutateAnecdotes = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });

  const vote = (anecdotes) => {
    mutateAnecdotes.mutate({ ...anecdotes, votes: anecdotes.votes + 1 });
    notificationDisp({ type: "SHOW", payload: `anecdote '${anecdotes.content}' Added` });
    setTimeout(() => {
      notificationDisp({ type: "" });
    }, 2000);
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};
export default AnecdoteList;
