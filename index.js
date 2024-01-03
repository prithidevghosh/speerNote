require("dotenv").config();
const express = require("express");
const routesFolder = require("./routes/index");
const connectDb = require("./config/db");

const app = express();

app.use(express.json());

connectDb();

app.use("/api", routesFolder);

app.listen(8000, () => {
  console.log("started listening");
});
