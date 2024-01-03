/**
 * @fileoverview
 * This file defines the Express router for handling various routes related to notes, requiring authentication.
 * It includes routes for retrieving, creating, updating, deleting notes, and sharing notes with other users.
 * @version 1.0.0
 * @author Your Name
 * @exports {Router} - The Express router for authenticated note-related routes.
 */

const express = require("express");
const passport = require("../config/passport");
const notesController = require("../controllers/notes");

/**
 * Express router for authenticated note-related routes.
 *
 * @type {express.Router}
 */
const router = express.Router();

// Routes for handling notes, requiring authentication
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  notesController.getNotes
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  notesController.createNotes
);
router.delete(
  "/delete/:noteid",
  passport.authenticate("jwt", { session: false }),
  notesController.deleteNote
);
router.put(
  "/update/:noteid",
  passport.authenticate("jwt", { session: false }),
  notesController.updateNote
);
router.post(
  "/share/:shareduserid/:noteid",
  passport.authenticate("jwt", { session: false }),
  notesController.shareNotes
);

module.exports = router;
