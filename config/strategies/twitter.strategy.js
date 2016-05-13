var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
module.exports = function() {
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL,
    passReqToCallback: true
  },
  function(req, token, tokenSecret, profile, done) {
    process.nextTick(function () {
      var user = {};
        // user.email = profile.emails[0].value;
        user.image = profile.photos[0].value.replace('_normal', '');
        user.displayName = profile.displayName;
        user.twitter = {};
        user.twitter.id = profile.id;
        user.twitter.token = token;
    done(null, user);
    });
  }
));
};
