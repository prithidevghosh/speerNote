/**
 * @fileoverview
 * This file defines the Express router for handling authentication-related routes.
 * It includes routes for user registration (sign-up) and user authentication (sign-in).
 * @version 1.0.0
 * @author Your Name
 * @exports {Router} - The Express router for authentication routes.
 */

const express = require("express");
const authController = require("../controllers/auth");

/**
 * Express router for authentication routes.
 *
 * @type {express.Router}
 */
const router = express.Router();

// Route for user registration (sign-up)
router.post("/signup", authController.signUp);

// Route for user authentication (sign-in)
router.post("/login", authController.signIn);

module.exports = router;
