import React from "react";


const NewBlog = (props) => {
  const hideNewBlog = { display: props.newBlogForm ? "none" : ""}
  const showNewBlog = { display: props.newBlogForm ? "" : "none"}
  return(
    <>
    
          <div style={hideNewBlog}>
          <button id="new-blog" type="submit" onClick={() => props.setNewBlogForm(true)}>
            new blog
          </button>
          </div>
          <div style={showNewBlog}>
          <h1> Create New :</h1>
          <form onSubmit={props.handleNewBlog}>
            title :{" "}
            <input
            id="title"
              type="text"
              value={props.title}
              onChange={props.setTitle}
            />
            <br />
            author :{" "}
            <input
            id="author"
              type="text"
              value={props.author}
              onChange={props.setAuthor}
            />
            <br />
            url :{" "}
            <input
            id="url"
              type="text"
              value={props.url}
              onChange={props.setUrl}
            />
            <br />
            <button id="create-blog" type="sumbit">create</button>
          </form>
          <button type="submit" onClick={() => props.setNewBlogForm(false)}>
            cancel
          </button>
          </div>
          </>
  )
}

export default NewBlog