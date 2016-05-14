var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
module.exports = function() {
  var user = {
    username: 'asep@gmail.com',
    password: 'Asif1994'
  };
  passport.use(new LocalStrategy({
      passReqToCallback: true
  },
  function(req, username, password, done) {
    console.log('it worked');
    process.nextTick(function () {
      if(username === user.username && password === user.password) {
        // user.email = profile;
        // user.image = profile._json.avatar_url;
        user.displayName = username;
        // user.email = email;
        console.log(user);
        return done(null, user);
      }
      done(null, null);
    });
  }));
};
