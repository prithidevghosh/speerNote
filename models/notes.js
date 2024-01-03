/**
 * @fileoverview
 * This file defines the Mongoose model for handling notes in the application.
 * It includes the schema for a note, specifying the text, owner, and sharedWith fields.
 * @version 1.0.0
 * @author Your Name
 * @exports {Model} - The Mongoose model for notes.
 */

const mongoose = require("mongoose");

/**
 * Mongoose schema for a note.
 *
 * @type {mongoose.Schema}
 */
const noteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model for the owner
    required: true,
  },
  sharedWith: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model for shared users
    },
  ],
});

// Index for enabling text search on the 'text' field
noteSchema.index({ text: "text" });

/**
 * Mongoose model for notes.
 *
 * @type {Model}
 */
const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
