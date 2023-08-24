const userRouter = require("express").Router();
const User = require("../models/users");
const bcrypt = require("bcryptjs");

userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", "title author url");

  res.json(users);
});
userRouter.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  return res.json(user);
});

userRouter.post("/", async (req, res) => {
  const { username, password, name } = req.body;
  const existingUser = await User.findOne({ username : username });
  if (password < 3) return res.send(400);
  if (existingUser) return res.status(422).send("Username already exists");

  const saltRounds = 10;
  const passwordhash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    username,
    password: passwordhash,
    name,
  });
  user
    .save()
    .then((results) => res.status(201).json(results))
    .catch((err) => res.status(400).send(err));
});

userRouter.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => res.send(201))
    .catch(() => res.send(404));
});

userRouter.put("/:id", (req, res) => {
  const updateUser = {
    username: req.body.username,
    name: req.body.name,
    password: req.body.password,
  };
  User.findByIdAndUpdate(req.params.id, updateUser, { new: true })
    .then(() => res.send(201))
    .catch(() => res.send(404));
});

module.exports = userRouter;
