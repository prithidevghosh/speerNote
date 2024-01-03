/**
 * @fileoverview
 * This file defines the Mongoose model for handling users in the application.
 * It includes the schema for a user, specifying the name, email, and password fields.
 * @version 1.0.0
 * @author Your Name
 * @exports {Model} - The Mongoose model for users.
 */

const mongoose = require("mongoose");

/**
 * Mongoose schema for a user.
 *
 * @type {mongoose.Schema}
 */
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

/**
 * Mongoose model for users.
 *
 * @type {Model}
 */
const User = mongoose.model("User", userSchema);

module.exports = User;
