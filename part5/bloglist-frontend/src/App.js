import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import login from "./services/login";
import AddedBlog from "./components/AddedBlog";
import LoginForm from "./components/LoginForm";
import NewBlog from "./components/NewBlog";
import React from "react";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState(null);
  const [styleMsg, setStyleMsg] = useState("");
  const [loginVisible, setLoginVisible] = useState(false);
  const [newBlogForm, setNewBlogForm] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
    const storageLocale = window.localStorage.getItem("connectedUser");
    if (storageLocale) {
      const user = JSON.parse(storageLocale);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(username, password);
    login({ username, password })
      .then((response) => {
        window.localStorage.setItem("connectedUser", JSON.stringify(response));
        setUser(response);
        setUsername("");
        setPassword("");
        setMessage("connected");
        setStyleMsg("validationMessage");
        setLoginVisible(false);
      })
      .catch(() => {
        setMessage("wrong username or password");
        setStyleMsg("errorMessage");
      })
      .finally(() => {
        setTimeout(() => {
          setMessage(null);
        }, 1500);
      });
  };
  const handleLogOut = () => {
    window.localStorage.clear();
    setUser(null);
  };
  const handleNewBlog = (event) => {
    event.preventDefault();
    blogService
      .create({ title, author, url })
      .then(async (savedBlog) => {
        const allNewBlogs = await blogService.getAll();
        setBlogs(allNewBlogs);
        setTitle("");
        setAuthor("");
        setUrl("");
        setMessage(`a new blog ${savedBlog.title} by ${savedBlog.author}`);
        setStyleMsg("validationMessage");
        setNewBlogForm(false);
      })
      .catch((error) => {
        setMessage(`Failed To Add Blog`);
        setStyleMsg("errorMessage");
      })
      .finally(() => {
        setTimeout(() => {
          setMessage(null);
        }, 1500);
      });
  };
  const handleUpdateBlog = (id, blog) => {
    blogService
      .update(id, blog)
      .then((resp) => {
        const newBlog = [...blogs];
        const blogIndex = blogs.findIndex((blog) => blog.id === resp.id);
        if (blogIndex !== -1) {
          const blog = newBlog[blogIndex];
          blog.likes = parseInt(blog.likes) + 1;
        }
        setBlogs(newBlog);
      })

      .catch((e) => console.log(e));
  };
  const handleRemoveBlog = (id) => {
    blogService
      .remove(id)
      .then(() => setBlogs(blogs.filter((blog) => blog.id !== id)))
      .catch((e) => console.log(e));
  };
  const logOutButton = () => {
    return (
      <>
        <span> {user.name} Logged In</span>{" "}
        <button id="logout-button" type="submit" onClick={handleLogOut}>
          logout
        </button>
      </>
    );
  };

  const logInForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={showWhenVisible} id="log-form">
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            password={password}
            handlePassChange={({ target }) => setPassword(target.value)}
            message={message}
            styleMsg={styleMsg}
            cancel={() => setLoginVisible(false)}
          />
        </div>

        <div style={hideWhenVisible}>
          <h1>Blogs</h1>
          <button type="submit" id="login-form" onClick={() => setLoginVisible(true)}>
            log-IN
          </button>
          <NewBlog
            newBlogForm={newBlogForm}
            setNewBlogForm={setNewBlogForm}
            handleNewBlog={handleNewBlog}
            title={title}
            author={author}
            url={url}
            setTitle={({ target }) => setTitle(target.value)}
            setAuthor={({ target }) => setAuthor(target.value)}
            setUrl={({ target }) => setUrl(target.value)}
          />
          <AddedBlog message={message} style={styleMsg} />
          {user !== null ? logOutButton() : <></>}

          {blogs
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleUpdate={handleUpdateBlog}
                removeBlog={handleRemoveBlog}
                username={user.username}
              />
            ))}
        </div>
      </div>
    );
  };
  return logInForm();
};

export default App;
