var express = require('express');
var app = express();
app.set('view engine', 'jade');
var fs = require("fs");

function readJsonFileSync(filepath, encoding){

    if (typeof (encoding) === 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function getConfig(file){
    var filepath = __dirname + '/' + file;
    return readJsonFileSync(filepath);
}

var articles = getConfig('articles.json');
var about = getConfig('about.json');
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
    res.render('body',articles);
});

app.get('/about', function(req, res) {
  res.render('about',about);
});

app.listen(8080, function () {
  console.log('App running on port 8080');
});
