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
module.exports = auth;
