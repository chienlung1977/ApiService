
/*
 * GET home page.
 */
var mongoose = require('mongoose')
	,usr = require('../modules/mongodb/users.js');

//mongoose.connect('mongodb://localhost/lw');


exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.users = function (req,res){
	console.log('call user');
	//console.log(usr.getList());
};