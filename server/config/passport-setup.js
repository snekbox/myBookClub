var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20');
const { verifyUser } = require('../../database/helpers');


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/redirect"
},
  function (accessToken, refreshToken, profile, done) {
    verifyUser(profile.emails[0].value, profile.id)
    .then((result) => {
      return done(null, result[0]);
    }).catch((err) => {
      return done(err, null);
    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});