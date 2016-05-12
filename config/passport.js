var passport = require('passport');

module.exports = function(app) {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  require('./strategies/facebook.strategy.js')();
};
