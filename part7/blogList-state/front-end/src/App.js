import { useEffect, useState } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import login from "./services/login";
import AddedBlog from "./components/AddedBlog";
import LoginForm from "./components/LoginForm";
import NewBlog from "./components/NewBlog";
import React from "react";
import { removeNotif, setNotif } from "./reducers/notifReducers";
import { useDispatch, useSelector } from "react-redux";
import {
  addBlogList,
  deleteBlog,
  fetchBlogList,
  updateBlog,
} from "./reducers/blogRedcuers";
import { saveUser } from "./reducers/userReducers";
import { Link, Route, Routes, useMatch } from "react-router-dom";
import userServices from "./services/user";
import { addComment } from "./reducers/blogRedcuers";
import Button from "react-bootstrap/Button";

const User = ({ user, blogs }) => {
  if (!user) return <></>;
  const userBlogs = blogs.filter((blog) => blog.user.id === user.id);

  return (
    <>
      <h2>{user.username}</h2>
      <p>
        <b>AddedBlog</b>
      </p>
      {userBlogs.map((userBlog) => (
        <ul key={userBlog.id}>
          <li>{userBlog.title}</li>
        </ul>
      ))}
    </>
  );
};
const Users = ({ user }) => {
  return (
    <>
      <p>
        <b>Users</b>
      </p>
      <table>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        <tr>
          {user.map((user) => (
            <div key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </div>
          ))}
        </tr>
      </table>
    </>
  );
};

const Blogs = ({ blogs }) => {
  return (
    <>
      {blogs.map((blog) => (
        <Link to={`/blogs/${blog.id}`} key={blog.id}>
          <Blog key={blog.id} blog={blog} />
        </Link>
      ))}
    </>
  );
};
const OneBlog = ({ blog, updateBlog, deleteBlog, addComment }) => {
  const [comment, setComment] = useState("");
  console.log(blog);
  if (!blog) return <></>;
  return (
    <div className="blog-info">
      {blog.author}
      <br />
      {blog.url}
      <br />
      likes {blog.likes}{" "}
      <Button
        variant="info"
        id="like-blog"
        onClick={() => updateBlog(blog.id, blog)}
      >
        like
      </Button>
      <br />
      {blog.user.username}
      <br />
      <p>comments:</p>
      <input type="text" onChange={(e) => setComment(e.target.value)} />
      <button type="submit" onClick={() => addComment(blog, comment)}>
        add comment
      </button>
      {blog.comments.map((comment) => <li>{comment}</li>)}
      <br />
      <Button id="remove-blog" onClick={() => deleteBlog(blog.id)}>
        remove
      </Button>
    </div>
  );
};

const App = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [newBlogForm, setNewBlogForm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [styleMsg, setStyleMsg] = useState("");
  const [loginVisible, setLoginVisible] = useState(false);
  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    dispatch(fetchBlogList());
    userServices
      .getAll()
      .then((resp) => setAllUser(resp))
      .catch((e) => console.log(e));
    if (state.user) {
      blogService.setToken(state.user.token);
    }
  }, [state.user, dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(username, password);
    login({ username, password })
      .then((response) => {
        dispatch(saveUser(response));
        setUsername("");
        setPassword("");
        dispatch(setNotif("connected"));
        setStyleMsg("success");
        setLoginVisible(false);
      })
      .catch(() => {
        dispatch(setNotif(`LogIn Failed`));
        setStyleMsg("danger");
      })
      .finally(() => {
        setTimeout(() => {
          dispatch(removeNotif());
        }, 1500);
      });
  };
  const handleLogOut = () => {
    window.localStorage.clear();
    dispatch(saveUser(null));
  };
  const handleNewBlog = (event) => {
    event.preventDefault();

    try {
      const savedBlog = dispatch(addBlogList({ title, author, url }));
      dispatch(fetchBlogList());
      setTitle("");
      setAuthor("");
      setUrl("");
      dispatch(
        setNotif(`A new blog ${savedBlog.title} by ${savedBlog.author}`),
      );
      setStyleMsg("success");
      setNewBlogForm(false);
      setTimeout(() => {
        dispatch(removeNotif());
      }, 1500);
    } catch (error) {
      console.error("Failed to add blog:", error);
      dispatch(setNotif("Failed To Add Blog"));
      setStyleMsg("danger");
    }
  };
  const handleUpdateBlog = (id, blog) => {
    dispatch(updateBlog(id, blog));
  };
  const handleRemoveBlog = (id) => {
    console.log(id);
    dispatch(deleteBlog(id));
  };
  const handleAddComment = (blog, comment) => {
    dispatch(addComment(blog, comment));
  };
  const logOutButton = () => {
    return (
      <>
        <span>{state.user?.name} Logged In</span>{" "}
        <button id="logout-button" type="submit" onClick={handleLogOut}>
          logout
        </button>
      </>
    );
  };
  const matchUser = useMatch("/users/:id");
  const user = matchUser
    ? allUser.find((user) => user.id === String(matchUser.params.id))
    : null;

  const matchBlog = useMatch("/blogs/:id");
  const blog = matchBlog
    ? state.blog.blogList.find(
      (blog) => blog.id === String(matchBlog.params.id),
    )
    : null;

  const padding = {
    padding: 5,
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
            message={state.notif}
            styleMsg={styleMsg}
            cancel={() => setLoginVisible(false)}
          />
        </div>

        <div style={hideWhenVisible}>
          <h1>Blogs</h1>
          <Button
            variant="primary"
            type="submit"
            id="login-form"
            onClick={() => setLoginVisible(true)}
          >
            log-IN
          </Button>
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
          <AddedBlog message={state.notif} style={styleMsg} />
          {state.user !== null ? logOutButton() : <></>}

          <div>
            <Link style={padding} to="/users">
              users
            </Link>
            <Link style={padding} to="/blogs">
              blogs
            </Link>
          </div>
          <Routes>
            <Route
              path="/users/:id"
              element={<User user={user} blogs={state.blog.blogList} />}
            />
            <Route path="/users" element={<Users user={allUser} />} />
            <Route
              path="/blogs"
              element={<Blogs blogs={state.blog.blogList} />}
            />
            <Route
              path="/blogs/:id"
              element={
                <OneBlog
                  blog={blog}
                  updateBlog={handleUpdateBlog}
                  deleteBlog={handleRemoveBlog}
                  addComment={handleAddComment}
                />
              }
            />
          </Routes>
        </div>
      </div>
    );
  };
  return logInForm();
};

export default App;
