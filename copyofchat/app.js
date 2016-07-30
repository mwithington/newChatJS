'use strict';

// define globals
var express = require('express'),
    io = require('socket.io'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = io.listen(server),
    path = require('path'),
    favicon = require('static-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');
var db = ['hello'];


// set up our JSON API for later
require('./routes/api')(app);

// set up our socket server
require('./sockets/base')(io);

// start the server
server.listen(3000);

// optional - set socket.io logging level
//io.set('log level', 1000);

// view engine setup (for later)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// middleware settings
app.use(favicon());
//app.use(logger('dev'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));

// for dev
app.use(express.static(__dirname +  '/angular-frontend/app/'));

// for production, do 'grunt --force' and then comment the line above
// and uncomment the line below

//app.use(express.static(__dirname +  '/public'));



io.on('connection', function (socket) {

 socket.on('message', function (from, msg) {

      console.log(db);
    });

});


/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});







/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

/*** MONGODB STUFF ***/
'use strict';

// define globals
var express = require('express'),
    io = require('socket.io'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = io.listen(server),
    path = require('path'),
    favicon = require('static-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

// set up our JSON API for later
require('./routes/api')(app);

// set up our socket server
require('./sockets/base')(io);

// start the server
server.listen(3000);

// optional - set socket.io logging level
io.set('log level', 1000);

// view engine setup (for later)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// middleware settings
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));

// for dev
app.use(express.static(__dirname +  '/angular-frontend/app/'));

// for production, do 'grunt --force' and then comment the line above
// and uncomment the line below

//app.use(express.static(__dirname +  '/public'));

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

/* MONGODB STUFF */


/* LOAD THE MONGODB MODULE */
// import mongodb native drivers
var mongodb = require('mongodb');

// connect to mongodb server using "MongoClient" interface
var MongoClient = mongodb.MongoClient;

/* DEFINE THE URL WE NEED TO CONNECT TO */
// Connection URL.  This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/chat';

/* CONNECT TO THE CHAT DATABASE */
// Use connect method to connect to the server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server.  Error:', err);
  } else {
    // connected
    console.log('Connection established to', url);

    /* INSERT/ UPDATE DATABASE */
    var collection = db.collection('messages');

    // create some test messages
    var msg1 = {username: 'test', message: 'hello'};
    var msg2 = {username: 'foo', message: 'greetings'};
    var msg3 = {username: 'bar', message: 'salutations'};

    // insert some test messages
    collection.insert([msg1, msg2, msg3], function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted %d documents into the "messages" collection. The documents inserted with "_id" are:', result.length, result);
      }
      // close connection
      db.close();
    });

    // retrieve documents from mongodb
    collection.find({username: 'bar'}).toArray(function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length) {
        console.log('Found:', result);
      } else {
        console.log('No document(s) found with defined "find" criteria!');
      }
      // close connection
      db.close();
    });
  }
});
