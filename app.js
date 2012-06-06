var express = require("express"),
    app     = express.createServer(express.logger()),
    io = require('socket.io').listen(app),
    _ = require('underscore')._;

app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/static'));
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
  app.use(app.router);
});

// for Heroku, no websockets, only long polling
// io.configure(function () {
//     io.set("transports", ["xhr-polling"]);
//     io.set("polling duration", 10);
// });

if (process.env.NODE_ENV === "production") {
    io.set('log level', 1);
}

// global sockets list
var sockets = [];

// ring method to emit the ring to all sockets
var ring = function(type) {
  if (type === undefined) {
    type = 'default';
  }
  console.log('Ringing: '+type);
  _.each(sockets, function(socket) {
      socket.emit('ring', { type: type });
  });
};

// views

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.post('/', function (req, res) {
  ring(req.body.type);
  res.send('OK');
});

// load any connecting socket to the sockets global
io.sockets.on('connection', function (socket) {
    sockets.push(socket);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});