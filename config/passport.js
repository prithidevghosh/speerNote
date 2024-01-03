/**
 * @fileoverview
 * This file configures and exports the Passport authentication middleware.
 * It utilizes the JWT strategy for token-based authentication.
 * @version 1.0.0
 * @author Your Name
 * @exports {Object} - The configured Passport authentication middleware.
 */

const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/users"); // Adjust the path based on your file structure
const token_secret = process.env.TOKEN_SECRET;

/**
 * Configuration options for JWT authentication strategy.
 *
 * @constant {Object}
 * @property {Function} jwtFromRequest - Function to extract JWT from the request.
 * @property {string} secretOrKey - Secret key for JWT verification.
 */
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: token_secret, // Replace with your actual secret key
};

/**
 * Passport middleware using JWT strategy for token-based authentication.
 *
 * @type {JwtStrategy}
 */
passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload._id);
      console.log(jwtPayload.sub);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = passport;
