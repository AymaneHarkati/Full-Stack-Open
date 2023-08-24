const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("../utils/userinit");
const api = supertest(app);
const User = require("../models/users");



describe("Fetch Users", () => {
  test("users are returned as json", async () => {
    await api
      .get("/api/user")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  
  test("there are many users", async () => {
    const response = await api.get("/api/user");
    expect(response.body).toHaveLength(helper.users.length);
  });
  
})
describe("testing API request POST", () => {
  test("create a new user ", async () => {
    const newUser = {
      username: "testing",
      name: "ana",
      password: "www.kklm.com",
    };
  
    await api
      .post("/api/user")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  
    const userAtEnd = await helper.userDB();
    expect(userAtEnd).toHaveLength(helper.users.length + 1);
  });
  test("username should be unique", async () => {
    const newUser = {
      username: "testing",
      name: "ana",
      password: "www.kklm.com",
    };
  
    await api
      .post("/api/user")
      .send(newUser)
      .expect(422)
      let userDB = await helper.userDB();
    expect(userDB).toHaveLength(helper.users.length);
  }, 10000);
  
  
})


// close mongoDB connection after test is done.
afterAll(async () => {
  await mongoose.connection.close();
});

