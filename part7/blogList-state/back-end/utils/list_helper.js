const dummy = (blogs) => {
  return 1;
}
const totalLikes = (blogs) => {
  return blogs.reduce((total, blog)=> total + blog.likes,0)
}
const favouriteBlog = (blogs) => {
  const sortedBlogs = blogs.sort((a,b) => b.likes - a.likes)
  return sortedBlogs[0]
}
const mostBlogs = (blogs) => {
  const sortedBlogs = blogs.sort((a,b) => b.blogs - a.blogs)
  return sortedBlogs[0]
}
const mostLikes = (blogs) => {
  const sortedBlogs = blogs.sort((a,b) => b.likes - a.likes)
  return sortedBlogs[0]
}
module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}