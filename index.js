/**
 * @fileoverview
 * This file initializes the Express application, connects to the MongoDB database, and sets up routes.
 * @version 1.0.0
 * @author Your Name
 */

require("dotenv").config();
const express = require("express");
const routesFolder = require("./routes/index");
const connectDb = require("./config/db");
const port = process.env.PORT;

/**
 * Express application instance.
 *
 * @type {express.Application}
 */
const app = express();

// Middleware to parse JSON in request body
app.use(express.json());

// Connect to the MongoDB database
connectDb();

// Routes setup
app.use("/api", routesFolder);

// Start the Express application on port 8000
app.listen(port, () => {
  console.log(`Server started listening on port ${port}`);
});
