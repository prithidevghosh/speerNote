/**
 * @fileoverview
 * This file contains the database connection setup and configuration.
 * It exports a function to connect to MongoDB using Mongoose.
 * @version 1.0.0
 * @author Your Name
 * @exports {Function} connectDB - A function to establish a connection to the MongoDB database.
 */

const mongoURI = process.env.MONGOURI;
const mongoose = require("mongoose");
const pino = require("pino");
const logger = pino();

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 *
 * @async
 * @function
 * @returns {Promise<void>} - A promise that resolves when the database connection is established.
 * @throws {Error} - Throws an error if the connection attempt fails.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
    });
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
