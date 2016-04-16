


var mongoose = require('mongoose')
	,auth = require('basic-auth');

//mongoose.connect('mongodb://localhost/lw');

var authUserSchema = new mongoose.Schema({
	username:{type:String,index:{unique:true}},
	password:String,
	role:String
});


var authModel = mongoose.model('auth', authUserSchema);

var authUser = new authModel({
	username:'alvin',
	password:'alvin',
	role:'admin'
	
});

authUser.save(function(err){
	if(!err){
		authUser.save();
		console.log('auth user created');
	}
	else{
		console.log('auth user already exist');
	}
});



exports.checkUser = function(req,res,next){
	var user = auth(req);
	if(user==undefined){
		console.log("User information is not available in the request");
		res.statusCode=401;
		res.setHeader('WWW-Authenticate','Basic');
		res.end('Unauthorized');
	}
	else{
		authenticate(user, res, next);
	}
};

function authenticate(user, res, next){
	var result = false;
	console.log('username:' +  user['name'] + ',password:' + user['pass']);
	authModel.findOne({username:user['name'],password:user['pass']},function(err,data){
		if(err){
			console.log(err);
			res.statusCode=401;
			response.end('Unauthorized');
		}
		else{
			if(!data){
				console.log('Unknown user');
				res.statusCode=401;
				res.end('Unauthorized');
				
			}
			else{
				console.log(data.username + ' authenticated successfully');
				next();
			}
		}
	});
	
}

