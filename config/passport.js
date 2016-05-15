var passport = require('passport');
var User = require('../models/userModel.js');

module.exports = function(app) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  require('./strategies/facebook.strategy.js')();
  require('./strategies/google.strategy.js')();
  require('./strategies/twitter.strategy.js')();
  require('./strategies/github.strategy.js')();
  require('./strategies/local.strategy.js')();
  require('./strategies/local-signin.strategy.js')();
};
