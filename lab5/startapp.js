var express = require('express');
var app = express();
app.set('view engine', 'jade');

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.render('body',{locals:{active: 1, username: "something"}});
});

app.get('/about', function(req, res) {
  res.send('about',{locals:{active: 2, username: "something"}});
});

app.listen(8080, function () {
  console.log('App running on port 8080');
});
