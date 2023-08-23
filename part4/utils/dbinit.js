const Blogs = require('../models/blogs')

const blogs = 
  [{"title":"nothing the same","author":"ana","url":"www.kklm.com","likes":15},
  {"title":"honestly nevermind","author":"drake","url":"www.kklm.com","likes":15}
]

const nonExistentId = async () => {
  const newBlog = new Blog({ title : "remove this"})
  await newBlog.save()
  await newBlog.deleteOne()
  return newBlog._id.toString
}

const blogDB = async () => {
  const blogs  = await Blogs.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  blogs, nonExistentId, blogDB
}