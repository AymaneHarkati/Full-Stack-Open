const listHelper = require('../utils/list_helper')
describe('List helper', () =>{
  test('dummy returns one', () => {
    const blogs = []
  
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  });
  test('Total of likes in blogs', () => {
    const blogs = [{ likes : 5}]
  
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(5)
  });
  test('Most liked Blog', () => {
    const blogs = [{
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    },{
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 10
    },{
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 1
    }]
    const equal = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }
    const result = listHelper.favouriteBlog(blogs)
    expect(result).toEqual(equal)
  });
  test('author with the most blogs', () => {
    const blogs = [
      {
        author: "Robert C. Martin",
        blogs: 5
      },
      {
        author: "Robert C. Martin",
        blogs: 3
      },
      {
        author: "Robert C. Martin",
        blogs: 2
      }
    ]
    const equal = {
      author: "Robert C. Martin",
      blogs: 5
    }
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(equal)
  });
  test('author with the most likes', () => {
    const blogs = [
      {
        author: "Robert C. Martin",
        likes: 5
      },
      {
        author: "Robert C. Martin",
        likes: 3
      },
      {
        author: "Robert C. Martin",
        likes: 2
      }
    ]
    const equal = {
      author: "Robert C. Martin",
      likes: 5
    }
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(equal)
  });
})
