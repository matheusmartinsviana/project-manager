const express = require("express");
const cors = require("cors");
const cookie_parser = require("cookie-parser");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cookie_parser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

module.exports = app;
