var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/userModel.js');

module.exports = function() {
  passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    process.nextTick(function () {
      var user = {};
      var query = {
        'local.email': email
      };

      User.findOne(query, function(err, user) {
        if(err) {
          console.log(error);
        }

        if(!user) {
          return done(null, false, req.flash('loginMessage', 'No user found.'));
        } else if (!user.validPassword(password))
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

        return done(null, user);
      });
    });
  }));
};
