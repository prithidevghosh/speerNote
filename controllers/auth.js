/**
 * @fileoverview
 * This file contains authentication-related controller functions for user sign-up and sign-in.
 * It includes functions for hashing passwords, comparing passwords, validating email addresses,
 * and generating JWT access tokens.
 * @version 1.0.0
 * @author Prithidev Ghosh
 * @exports {Object} authController - Authentication controller functions.
 */

const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const token_secret = process.env.TOKEN_SECRET;

/**
 * Hashes a plain password using bcrypt.
 *
 * @param {string} plainPassword - The plain text password to be hashed.
 * @returns {Promise<string>} - A promise that resolves to the hashed password.
 * @throws {Error} - Throws an error if hashing fails.
 */
async function encodePassword(plainPassword) {
  try {
    const hash = await bcrypt.hash(plainPassword, 10);
    return hash;
  } catch (err) {
    console.error("Error hashing password:", err);
    throw err;
  }
}

/**
 * Compares a password with its hashed counterpart.
 *
 * @param {string} enteredPassword - The plain text password entered by the user.
 * @param {string} hashedPasswordFromDatabase - The hashed password stored in the database.
 * @returns {Promise<boolean>} - A promise that resolves to true if the passwords match, false otherwise.
 * @throws {Error} - Throws an error if the comparison fails.
 */
async function comparePassword(enteredPassword, hashedPasswordFromDatabase) {
  try {
    const result = await bcrypt.compare(
      enteredPassword,
      hashedPasswordFromDatabase
    );
    return result;
  } catch (err) {
    console.error("Error comparing passwords:", err);
    throw err;
  }
}

/**
 * Validates an email address using a basic regular expression.
 *
 * @param {string} email - The email address to be validated.
 * @returns {boolean} - Returns true if the email is valid, false otherwise.
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generates an access token using the user information.
 *
 * @param {Object} user - The user object containing information for token generation.
 * @returns {string} - The generated JWT access token.
 */
function generateAccessToken(user) {
  return jwt.sign(user, token_secret, { expiresIn: "1000000" });
}

/**
 * Handles user registration (sign-up) by validating inputs, hashing password, and creating a new user.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A promise that resolves to the response for user registration.
 */
module.exports.signUp = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (isValidEmail(email)) {
      let hashedPassword = await encodePassword(password);
      let newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
      });

      return res.status(200).json({
        message: newUser,
      });
    } else {
      return res.status(400).json({
        message: "Invalid input parameter",
      });
    }
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.email === 1) {
      return res.status(400).json({
        message: "Email address is already in use.",
      });
    }
    console.error("Error in signUp:", error);
    res.status(500).send("Internal Server Error");
  }
};

/**
 * Handles user authentication (sign-in) by validating credentials and generating an access token.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A promise that resolves to the response for user authentication.
 */
module.exports.signIn = async (req, res) => {
  try {
    let { email, password } = req.body;
    let fetchedUserByEmail = await User.findOne({ email: email });

    if (!fetchedUserByEmail) {
      return res.status(400).json({
        message: "Unregistered user",
      });
    }

    let dbHashedPassword = fetchedUserByEmail.password;

    if (!(await comparePassword(password, dbHashedPassword))) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    const jwtToken = generateAccessToken(fetchedUserByEmail.toJSON());
    return res.status(200).json({
      message: jwtToken,
    });
  } catch (error) {
    console.error("Error in signIn:", error);
    res.status(500).send("Internal Server Error");
  }
};
