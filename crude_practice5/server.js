
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var movies = require('./app/movie-crud');


//var db = require('./config/db');
app.use(bodyParser.json({})); // parse application/json 
app.use('/movie', movies);



var mongo = require('mongodb');
var mongoose = require('mongoose');
var dbHost = 'mongodb://localhost:27017/practice';
var d=mongoose.connect(dbHost);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to DB");
});

var port = process.env.PORT || 4000; 
app.use(express.static(__dirname + '/public')); 


require('./app/routes')(app); 


app.listen(port);	
console.log('Magic happens on port ' + port); 			
exports = module.exports = app; 						