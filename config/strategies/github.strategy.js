var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;

module.exports = function() {
  passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      var user = {};
        // user.email = profile;
        user.image = profile._json.avatar_url;
        user.displayName = profile._json.name;
        user.github = {};
        user.github.id = profile.id;
        user.github.token = accessToken;
        // console.log(user);
    done(null, user);
    });
  }));
};
