// neccessary imports
const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const blogRouter = require("./controllers/blogsController");
const userRouter = require("./controllers/userController");
require("express-async-errors")
const loginRouter = require('./controllers/login')

// connet to mongo Atlas
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
logger.info("connecting to", config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info("Connected to mongodb"))
  .catch((e) => logger.error("Error connecting to mongodb"));

app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor)

if(process.env.NODE_ENV === 'test'){
  const testingRouter = require('./controllers/testingController')
  app.use('/api/testing', testingRouter)
}
// controllers endpoint
app.use("/api/blogs", blogRouter);
app.use("/api/user", userRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
