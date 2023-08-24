const User = require('../models/users')

const users = 
  [{username: "asmil", name:"aymane", password: " 14432567"},
  {username: "asmile", name:"amine", password: " 14432567"}
]

const nonExistentId = async () => {
  const newUser = new User({ username : "remove this"})
  await newUser.save()
  await newUser.deleteOne()
  return newUser._id.toString
}

const userDB = async () => {
  const users  = await User.find({}).populate("blogs")
  return users.map(blog => blog.toJSON())
}

module.exports = {
  users, nonExistentId, userDB
}