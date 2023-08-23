import { createAnecdote } from "../services/anecdotesService";
import React from "react";
import { useMutation, useQueryClient } from "react-query";

const AnecdotesForm = ({ notificationDisp }) => {
  const queryClient = useQueryClient();

  const newAnecMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });
  const create = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    newAnecMutation.mutate(
      { content, votes: 0 },
      {
        onSuccess: () => {
          notificationDisp({
            type: "SHOW",
            payload: `anecdote '${content}' Added`,
          });
        },
        onError : () => {
          notificationDisp({
            type: "SHOW",
            payload: `the content should be 5 char or more`,
          });
        }
      }
    );
    setTimeout(() => {
      notificationDisp({ type: "" });
    }, 2000);
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={(e) => create(e)}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="sumbit">create</button>
      </form>
    </>
  );
};
export default AnecdotesForm;
