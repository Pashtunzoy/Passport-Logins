var express = require('express');
var router = express.Router();
var passport = require('passport');
/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Facebook Login' });
});

router.get('/login', function(req, res) {
  res.render('signin');
});

router.post('/signup',
  passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/signup'
}));

router.get('/signup', function(req, res) {
  res.render('signup');
});

module.exports = router;
