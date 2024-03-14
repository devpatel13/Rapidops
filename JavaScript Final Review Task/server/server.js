const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

dotenv.config({ path: "./config.env" });
require("./db/connect");

app.use(express.json());

// Linking Routes
app.use(require("./router/routes"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
