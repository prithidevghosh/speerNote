/**
 * @fileoverview
 * This file contains the controller functions for managing notes in the application.
 * These functions handle the retrieval, creation, searching, sharing, updating, and deletion of notes.
 * @version 1.0.0
 * @author Prithidev Ghosh
 * @exports {Object} - Functions for handling note-related operations.
 */

const Notes = require("../models/notes");
const User = require("../models/users");

/**
 * Retrieve notes for the authenticated user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating success or failure.
 */
module.exports.getNotes = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have the authenticated user's ID

    const fetchedNotesDb = await Notes.find({ owner: userId });

    if (fetchedNotesDb.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Notes retrieved successfully.",
        data: fetchedNotesDb,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "No notes available for your account.",
        data: [],
      });
    }
  } catch (error) {
    console.error("Error in getNotes:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message, // Optionally include the error message in the response
    });
  }
};

/**
 * Create a new note for the authenticated user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating success or failure.
 */
module.exports.createNotes = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user._id; // Assuming you have the authenticated user's ID

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Text field is required for creating a note.",
      });
    }

    const newNote = await Notes.create({
      text,
      owner: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Note created successfully.",
      data: newNote,
    });
  } catch (error) {
    console.error("Error in createNotes:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message, // Optionally include the error message in the response
    });
  }
};

/**
 * Search for notes based on keywords.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating success or failure.
 */
module.exports.notesSearch = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Query parameter "q" is required for search.',
      });
    }

    const userId = req.user._id; // Assuming you have the authenticated user's ID

    const searchResults = await Notes.find(
      { $text: { $search: query }, owner: userId },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    return res.status(200).json({
      success: true,
      message: "Search results retrieved successfully.",
      data: searchResults,
    });
  } catch (error) {
    console.error("Error in notesSearch:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message, // Optionally include the error message in the response
    });
  }
};

/**
 * Share a note with another user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating success or failure.
 */
module.exports.shareNotes = async (req, res) => {
  try {
    const sharedUserId = req.params.shareduserid;
    const noteId = req.params.noteid;

    // Check if the shared user exists
    const sharedUser = await User.findById(sharedUserId);
    if (!sharedUser) {
      return res
        .status(404)
        .json({ success: false, message: "Shared user not found." });
    }

    // Check if the note exists
    const note = await Notes.findById(noteId);
    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found." });
    }

    // Check if the authenticated user is the owner of the note
    if (req.user._id.toString() !== note.owner.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Permission denied." });
    }

    // Check if the shared user is already in the list of shared users
    if (note.sharedWith.includes(sharedUserId)) {
      return res.status(400).json({
        success: false,
        message: "User already shared with this note.",
      });
    }

    // Add the shared user to the list of shared users
    note.sharedWith.push(sharedUserId);
    await note.save();

    return res
      .status(200)
      .json({ success: true, message: "Note shared successfully." });
  } catch (error) {
    console.error("Error in sharing note:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Delete a note.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating success or failure.
 */
module.exports.deleteNote = async (req, res) => {
  try {
    const noteId = req.params.noteid;

    // Check if the note exists
    const note = await Notes.findById(noteId);
    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found." });
    }

    // Check if the authenticated user is the owner of the note
    if (req.user._id.toString() !== note.owner.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Permission denied." });
    }

    // Delete the note
    await note.deleteOne();

    return res
      .status(200)
      .json({ success: true, message: "Note deleted successfully." });
  } catch (error) {
    console.error("Error in deleting note:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Update a note with new text.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating success or failure.
 */
module.exports.updateNote = async (req, res) => {
  try {
    const noteId = req.params.noteid;
    const newText = req.body.text;

    // Check if the note exists
    const note = await Notes.findById(noteId);
    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found." });
    }

    // Check if the authenticated user is the owner of the note
    if (req.user._id.toString() !== note.owner.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Permission denied." });
    }

    // Update the note with the new text
    note.text = newText;
    await note.save();

    return res.status(200).json({
      success: true,
      message: "Note updated successfully.",
      updatedNote: note,
    });
  } catch (error) {
    console.error("Error in updating note:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
