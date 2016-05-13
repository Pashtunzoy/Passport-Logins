var passport = require('passport');

module.exports = function(app) {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  require('./strategies/facebook.strategy.js')();
  require('./strategies/google.strategy.js')();
  require('./strategies/twitter.strategy.js')();
  require('./strategies/github.strategy.js')();
};
