const express = require("express");
const app = express();
const cors = require("cors");

// dotenv
require("dotenv").config();

// middleware to parse json
app.use(express.json());
app.use(cors());

// routes
const authRoutes = require("./routes/auth");
const theatreRoutes = require("./routes/theatre");
const filmRoutes = require("./routes/film");

// middlewares
const { urlNotFound, errorHandler } = require("./middlewares/errorMiddleware");

// connect to DB
const { connectToDB } = require("./config/db");
connectToDB();

// routes
// auth
app.use("/api/v1/auth", authRoutes);
// theatre
app.use("/api/v1/theatre", theatreRoutes);
// films
app.use("/api/v1/film", filmRoutes);

// error handling middlewares
app.use(urlNotFound);
app.use(errorHandler);

// listen
const PORT = 5000;
app.listen(process.env.PORT || PORT, () => {
  console.log("server is up and listening on port:", PORT);
});
