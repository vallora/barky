// require all necessary modules first to put them within scope
var express = require('express');
var morgan = require('morgan');

// this is our express app
var app = express();

// examples of setting some variables to use later
app.set('title', 'barky');
app.set('links', [
  '<ul>',
  '<li><a href="/hello.txt">hello</a></li>',
  '<li><a href="/hola.txt">hola</a></li>',
  '<li><a href="/bonjour.txt">bonjour</a></li>',
  '</ul>'
].join('\n'));


// for now, lets forget about the favicon to keep it out of the logs
app.get('/favicon.ico', function (req, res) {
  return;
});

// morgan is the new logger
app.use(morgan());

// if we set this before logger, then these wouldnt be logged
// im not so sure express.static is working...
app.use(express.static(__dirname + '/public'));


/**
 * set up gets to serve the correct response
 */
app.get('/', function(req, res){
  res.send('<h1>Homepage</h1>' + app.get('links'));
});

app.get('/hello.txt', function(req, res){
  res.send('<h1>Hello World</h1>' + app.get('links'));
});

app.get('/hola.txt', function(req, res){
  res.send('<h1>Hola Mundo</h1>' + app.get('links'));
});

app.get('/bonjour.txt', function(req, res){
  res.send('<h1>Bonjour Monde</h1>' + app.get('links'));
});

/**
 * listen for requests to the server
 */
var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});
