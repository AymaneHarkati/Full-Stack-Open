import { useState } from "react";
import PropTypes from 'prop-types'
import "../blogcss.css";
const Blog = ({ blog, handleUpdate, removeBlog }) => {

  const [view, setView] = useState(false);
  const updateBlog = () => {
    const newBlog = {
      title : blog.title,
      author : blog.author,
      likes : Number(blog.likes) +1,
      user : blog.user.id
    }
    handleUpdate(blog.id,newBlog);
  }
  const deleteBlog = () => {
    const conf = window.confirm(`remove blog ${blog.title} by ${blog.author}`);
    if(conf)
      removeBlog(blog.id);
  }
  const addInfo = () => {
    return (
      <div className="blog-info">
        {blog.author}
        <br />
        {blog.url}
        <br />
        likes {blog.likes} <button id="like-blog" onClick={updateBlog}>like</button>
        <br />
        {blog.user.username}
        <br />
        <button id="remove-blog" onClick={deleteBlog}>remove</button>
      </div>
    );
  };
  return (
    <div>
      <div className="blog-name">
        {" "}
        Title : {blog.title}{" "}
        <button id="blogs-information" type="submit" onClick={() => setView(!view)}>
          view
        </button>
      </div>
      <div className="blogs">
      {view ? addInfo() : <></>}
      </div>
      
    </div>
  );
};
Blog.propTypes = {
  handleUpdate : PropTypes.func.isRequired
}
export default Blog;
