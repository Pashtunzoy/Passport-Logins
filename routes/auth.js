var express = require('express');
var passport = require('passport');
var auth = express.Router();

auth.route('/facebook')
  .get(passport.authenticate('facebook'));
auth.route('/facebook/callback')
  .get(passport.authenticate('facebook', {
      successRedirect: '/users',
      failureRedirect: '/error'
}));

auth.route('/google')
  .get(passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/userinfo.email']
}));
auth.route('/google/callback')
  .get(passport.authenticate('google', {
      successRedirect: '/users',
      failure: '/error'
}));

auth.route('/twitter')
  .get(passport.authenticate('twitter'));
auth.route('/twitter/callback')
  .get(passport.authenticate('twitter', {
    successRedirect: '/users',
    failureRedirect: '/error'
}));

auth.route('/github')
  .get(passport.authenticate('github', { scope: [ 'user:email' ] }));
auth.route('/github/callback')
  .get(passport.authenticate('github', {
    successRedirect: '/users',
    failureRedirect: '/error'
}));
//
// auth.route('/signup')
//   .post(passport.authenticate('local', {
//     successRedirect: '/users',
//     failureRedirect: '/login'
// }));

module.exports = auth;
