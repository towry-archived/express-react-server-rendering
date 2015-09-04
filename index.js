// server.js (Express 4.0)
var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var React          = require('react');
var app            = express();

var component      = require('./component');

app.use(express.static(__dirname + '/public'));   // set the static files location /public/img will be /img for users
app.use(morgan('dev'));           // log every request to the console
app.use(bodyParser());            // pull information from html in POST
app.use(methodOverride());          // simulate DELETE and PUT

app.set('view engine', 'jade')
app.set('views', __dirname + '/views')

app.get('/', function (req, res, next) {
  component('App.jsx', {}, function (data) {
    res.render('index', {content: data});
  });
})

app.listen(8080); 
console.log('Magic happens on port 8080');      // shoutout to the user
