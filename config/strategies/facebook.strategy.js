var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function() {
  passport.use(new FacebookStrategy({
    clientID: '269058713433032',
    clientSecret: '5ee0b37d29a8731620b8829e1e6f70a4',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
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
