var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function() {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  function(req, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      var user = {};
        user.email = profile.emails[0].value;
        user.image = profile._json.image.url;
        user.displayName = profile.name.givenName+ ' ' + profile.name.familyName;
        user.google = {};
        user.google.id = profile.id;
        user.google.token = accessToken;
    done(null, user);
    });
  }));
};
