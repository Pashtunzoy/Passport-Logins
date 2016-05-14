var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function() {
  var user = {
    email: 'asep@gmail.com',
    name: 'Asif',
    password: 'Asif1994'
  };
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    console.log('it worked');
    process.nextTick(function () {
      if(email === user.email && password === user.password) {
        // user.email = profile;
        // user.image = profile._json.avatar_url;
        user.displayName = user.name;
        user.email = user.email;
        console.log(user);
        return done(null, user);
      }
      done(null, null);
    });
  }));
};
