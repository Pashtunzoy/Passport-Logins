var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var expressLayouts = require("express-ejs-layouts");
var mongoose = require('mongoose');
var flash = require('connect-flash');

// Our Routes to Index, User, Auth
var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');

// Get the envirment variables from .env file
require('dotenv').config();

// App Intialisation
var app = express();

// Open connection to mongodb
var db = mongoose.connect(process.env.MONGODB_URL);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressLayouts);
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
// app.disable('etag');
// The secret is just needed by the express session and is not going to be used anywhere.

app.use(session({
  secret: 'your secret',
  resave: false,
  saveUninitialized: false
}));

// Connecting Passport and passing the app instance
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./config/passport.js')(app);


// Making use of our routes
app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
