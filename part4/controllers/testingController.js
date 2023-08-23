testingRouter = require("express").Router();
const User = require("../models/users");
const Blog = require("../models/blogs");

testingRouter.post("/reset", async (req, res) => {
 await Blog.deleteMany({})
await User.deleteMany({});
  res.status(204).end()

});

module.exports = testingRouter
