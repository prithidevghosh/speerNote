/**
 * @fileoverview
 * This file defines the Express router for handling various routes related to notes.
 * It includes routes for authentication, notes, and searching notes based on keywords.
 * @version 1.0.0
 * @author Your Name
 * @exports {Router} - The Express router for note-related routes.
 */

const express = require("express");
const notesController = require("../controllers/notes");
const passport = require("../config/passport");

/**
 * Express router for note-related routes.
 *
 * @type {express.Router}
 */
const router = express.Router();

// Routes for authentication and notes
const authRoute = require("./auth");
const notesRoute = require("./notes");
router.use("/auth", authRoute);
router.use("/notes", notesRoute);

// Route for searching notes based on keywords
router.get(
  "/search",
  passport.authenticate("jwt", { session: false }),
  notesController.notesSearch
);

module.exports = router;
