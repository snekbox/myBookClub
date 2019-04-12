var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20');
const { verifyUser, getUserById } = require('../../database/helpers');


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/redirect"
},
  function (accessToken, refreshToken, profile, done) {
    verifyUser(profile.emails[0].value, `${profile.name.givenName} ${profile.name.familyName}`)
    .then((result) => {
      done(null, result[0]);
    }).catch((err) => {
      done(err, null);
    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  getUserById(id)
  .then((user) => {
    done(null, user[0]);
  }).catch((err) => {
    done(err);
  });
});