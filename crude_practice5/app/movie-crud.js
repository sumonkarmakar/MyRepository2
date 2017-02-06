var express = require('express');
var router = express.Router();
bodyParser = require('body-parser');

var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({

	moviTitle: String,
	moviLanguage:String,
	moviGenre: String,
	moviPoster:String,
	moviDirector: String,
	moviActors: String
});

var Movie = mongoose.model('Movie',movieSchema,'movie');

router.post('/addMovie',function(req,res){
  console.log(req.body);
 var moviedoc=new Movie({
  moviTitle: req.body.Title,
  moviLanguage: req.body.Language,
  moviGenre: req.body.Genre,
  moviPoster: req.body.Poster,
  moviDirector:req.body.Director,
  moviActors: req.body.Actors
 });

 moviedoc.save(function(err,docs){
  if(err) throw err;
  console.log("Book Saved Successfully");
  res.json(docs);
 });  
});


module.exports = router;