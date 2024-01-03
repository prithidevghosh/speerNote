const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const token_secret = process.env.TOKEN_SECRET;

async function encodePassword(plainPassword) {
  try {
    const hash = await bcrypt.hash(plainPassword, 10);
    return hash;
    // Store the hashed password in the database
  } catch (err) {
    console.error("Error hashing password:", err);
    throw err; // Propagate the error
  }
}

async function comparePassword(enteredPassword, hashedPasswordFromDatabase) {
  try {
    const result = await bcrypt.compare(
      enteredPassword,
      hashedPasswordFromDatabase
    );
    return result;
    // Allow or deny access to the user based on the result
  } catch (err) {
    console.error("Error comparing passwords:", err);
    throw err; // Propagate the error
  }
}
function isValidEmail(email) {
  // Regular expression for a basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function generateAccessToken(user) {
  return jwt.sign(user, token_secret, { expiresIn: "1800s" });
}

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
      // Provide a meaningful response for duplicate email
      return res.status(400).json({
        message: "Email address is already in use.",
      });
    }
    console.error("Error in signUp:", error);
    // Handle the error
    res.status(500).send("Internal Server Error");
  }
};

module.exports.signIn = async (req, res) => {
  try {
    let { email, password } = req.body;
    let fetchedUserByEmail = await User.findOne({ email: email });
    if (!fetchedUserByEmail) {
      return res.status(400).json({
        message: "unregistered user",
      });
    }

    let dbHashedPassword = fetchedUserByEmail.password;

    if (!comparePassword(password, dbHashedPassword)) {
      return res.status(400).json({
        messgae: "wrong password",
      });
    }

    const jwtToken = generateAccessToken(fetchedUserByEmail.toJSON());
    return res.status(200).json({
      message: jwtToken,
    });
  } catch (error) {}
};
