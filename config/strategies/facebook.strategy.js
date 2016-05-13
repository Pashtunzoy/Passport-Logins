var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function() {
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    passReqToCallback: true,
    profileFields: ['emails', 'name']
  },
  function(req, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      var user = {};
        user.email = profile.emails[0].value;
        //user.image = profile._json.image.url;
        user.displayName = profile.name.givenName+ ' ' + profile.name.familyName;
        user.facebook = {};
        user.facebook.id = profile.id;
        user.facebook.token = accessToken;
    done(null, user);
    });
  }));
};
