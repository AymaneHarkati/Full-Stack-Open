import "../blogcss.css";
const Blog = ({ blog }) => {
  return (
    <div>
      <div className="blog-name"> Title : {blog.title} </div>
    </div>
  );
};
export default Blog;
