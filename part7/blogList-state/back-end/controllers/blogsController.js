const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
// check the value of the token if valid

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", "username name id");
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);
  const blog = new Blog({ ...request.body, user: user.id });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "not Allowed" });
  }
  const blog = await Blog.findByIdAndRemove(request.params.id);
  if (decodedToken.id.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(202).json({ response: "deleted" });
  } else {
    response.status(404).json({ response: "error" });
  }
});

blogsRouter.put("/:id", (request, response) => {
  const blog = request.body;
  const updatedBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    user: blog.user,
    comments: blog.comments,
  };
  Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((e) => console.log(e));
});
module.exports = blogsRouter;
