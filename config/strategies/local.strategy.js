var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/userModel.js');

module.exports = function() {
  passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    process.nextTick(function () {
      if (req.user) {
        var query = {};
      if(req.user.facebook) {
          var query = {
              'facebook.id': req.user.facebook.id
          };
      } else if(req.user.google) {
            var query = {
                'google.id': req.user.google.id
            };
        } else if (req.user.github) {
            var query = {
                'github.id': req.user.github.id
            };
        } else if (req.user.twitter) {
            var query = {
                'twitter.id': req.user.twitter.id
            };
        }
        User.findOne(query, function (error, user) {
            console.log(error);
            if(user) {
              user.local.name = req.param('name');
              user.local.email = email;
              user.local.password = user.generateHash(password);
              user.save();
              done(null, user);
            }
        });
      } else {
        var query = {
          'local.email': email
        };
        User.findOne(query, function(err, user) {
          if(user) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
          } else {
            var user = new User();
            user.local.name = req.param('name');
            user.local.email = email;
            user.local.password = user.generateHash(password);
            user.save();
            done(null, user);
          }
        });
      }
    });
  }));
};
