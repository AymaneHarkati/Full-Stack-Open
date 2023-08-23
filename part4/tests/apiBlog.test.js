const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const tester = require("../utils/dbinit");
const api = supertest(app);
const Blog = require("../models/blogs");

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = tester.blogs.map((blog) => new Blog(blog));
  const promises = blogObjects.map((blog) => blog.save());
  await Promise.all(promises);
});
describe("When there blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("there are many blogs", async () => {
    const response = await api.get("/api/blogs");
  
    expect(response.body).toHaveLength(tester.blogs.length);
  });
  
  test("the first blogs is about HTTP methods", async () => {
    const response = await api.get("/api/blogs");
  
    expect(response.body[0].title).toBe("nothing the same");
  });  
})
describe("testing API request POST", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "testing",
      author: "ana",
      url: "www.kklm.com",
      likes: 9,
    };
  
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set('Authorization', "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RpbmciLCJpZCI6IjY0ZDI4Y2ZhZTA1ZjE0N2VhOWJjNWYzZiIsImlhdCI6MTY5MTUyMDc1NywiZXhwIjoxNjkxNTI0MzU3fQ.OG1a-OrNCqqs6FWjVB6p2-txYbErhQ1y_8wJ1Dg9H5U")
      .expect(201)
      .expect("Content-Type", /application\/json/);
  
    const blogsAtEnd = await tester.blogDB();
    expect(blogsAtEnd).toHaveLength(tester.blogs.length + 1);
  
    const title = blogsAtEnd.map((n) => n.title);
    expect(title).toContain("testing");
  });
  test("title and url are required", async () => {
    const newBlog = {
      title: "nolikesfield",
      author: "hamid",
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
      let blogAdded = await tester.blogDB();
    expect(blogAdded).toHaveLength(tester.blogs.length);
  }, 10000);
  
  
})

describe("Some test about objects", () => {
  test("check if the id key is defined", async () => {
    const response = await api.get("/api/blogs");
  
    expect(response.body[0].id).toBeDefined();
  });
  
  test("check the default value of likes is zero", async () => {
    const newBlog = {
      title: "nolikesfield",
      author: "hamid",
      url: "www.kklm.com",
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type",/application\/json/);
    let blogAdded = await tester.blogDB();
    expect(blogAdded).toHaveLength(tester.blogs.length + 1);
    const zeroLikesBlog = blogAdded.filter((blog) => Number(blog.likes) === 0);
    expect(Number(zeroLikesBlog[0].likes)).toBe(0);
  });
})


describe("delete Objects", () => {
  test('deleting a blog', async () => {
    const blog = await tester.blogDB();
    id = blog[0].id;
    await api.delete(`/api/blogs/${id}`)
    .expect(201);

    const blogs = await tester.blogDB();
    expect(blogs.length).toBe(tester.blogs.length + -1);

  })
})
describe("updating a blog", () => {
  test('updating a single Blog', async () => {
    const blog = await tester.blogDB();
    const newBlog = {
      title: "new",
      author: "ana",
      url: "www.kklm.com",
      likes: 9,
    };
    id = blog[0].id;
    await api.put(`/api/blogs/${id}`, newBlog)
    .expect(200);

  })
})

// close mongoDB connection after test is done.
afterAll(async () => {
  await mongoose.connection.close();
});

