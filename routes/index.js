var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/userModel.js');

router.use(function(req,res,next){
  res.locals.login = req.isAuthenticated();
  res.locals.user = req.user;
  next();
});

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/login', function(req, res) {
  if(req.user) {
    return res.redirect('/users');
  }
  res.render('signin', { message: req.flash('loginMessage') });
});

router.get('/signup', function(req, res) {
  res.render('signup', { message: req.flash('signupMessage') });
});

router.post('/login', passport.authenticate('local-signin', {
  successRedirect : '/users',
  failureRedirect : '/login',
  failureFlash : true
}));

router.post('/signup',
  passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/signout', function(req, res){
    req.logout();
    res.redirect('/login');
});

module.exports = router;
