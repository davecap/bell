var express = require("express"),
    app     = express.createServer(express.logger()),
    io = require('socket.io').listen(app),
    _ = require('underscore')._;

var sockets = [];

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.post('/ring/:type', function (req, res) {
    if (req.params.type === 'bell') {
        _.each(sockets, function(socket) {
            socket.emit('ring', { type: req.params.type });
        });
    }
});

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

io.configure(function () {
    io.set("transports", ["xhr-polling"]);
    io.set("polling duration", 10);
});

io.sockets.on('connection', function (socket) {
    sockets.push(socket);
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});