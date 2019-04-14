/* eslint-disable func-names */
const passport = require('passport');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const config = require('./config');
const { verifyUser } = require('../../database/helpers');

module.exports = function() {
  passport.use(
    new GoogleTokenStrategy(
      {
        clientID: config.googleAuth.clientID,
        clientSecret: config.googleAuth.clientSecret,
      },
      function(accessToken, refreshToken, profile, done) {
        return verifyUser(accessToken, refreshToken, profile)
          .then(result => {
            done(result);
          })
          .catch(err => {
            done(err);
          });
      },
    ),
  );
};
