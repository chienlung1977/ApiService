


var mongoose = require('mongoose')
	,Grid = require('gridfs-stream')
	,mongoosePaginate = require('mongoose-paginate')
	,expressPaginate = require('express-paginate');


mongoose.connect('mongodb://localhost/lw');

var userSchema = new mongoose.Schema({
 email: {type: String, index: {unique: true}},
 password: String,
 create_time: {type: Date, default: Date.now},
 nick_name: String
 
});

//userSchema.plugin(mongoosePaginate);

var userModel = mongoose.model('user', userSchema);

var mongodb = mongoose.connect;
//var gfs = Grid(mongodb.db,mongoose.mongo);



//查詢所有資料

exports.getList = function (){
	
	var json;
	console.log('start getlist');
	userModel.find({},function(err,data){
		if(err){
			console.log('error');
			json= '';
			callback(err);
		}
		else{
			console.log('load data:' + data);
			//json = JSON.stringify(data);
			console.log('load json data:' + data);
			//res.setHeader('content-type','application/json');
			//res.end(json);
			callback( data);
			
		}
	});
	
	//console.log('return jsondata ' + json);
	//return json;
	
	//return "call from getlist";
};


exports.list=function(req,res){
	
	userModel.find({},function(err,data){
		if(err){
			console.error(err);
		}
		else{
			
			json = JSON.stringify(data);
			
			res.setHeader('content-type','application/json');
			res.end(json);
			
		}
	});	
	
};


exports.create =function(req,res){
	
	console.log('post email :' + req.body.email);
	
	var email = req.body.email;
	var pwd = req.body.password;
	var nick_name= req.body.nick_name;
	
	var usr = new userModel({
		 email: email,
		 password:pwd,
		 nick_name:nick_name
		});
		
		//var db = mongoose.connection;
	
		usr.save(function(error){
			
		 if (error) {
		 console.log('Error while saving [' + email + '] for create');
		 console.log(error.message);
		
		 }
		 else {
			 usr.save();
			 console.log('[' + email + '] for create has been successfully stored');
		 }
		 
		 
		 
		});
		
		if (res != null){
			 res.send('Created');
			 }
		return;
		
	
		
};

exports.update = function(req,res){
	
	var _email = req.body.email;
	var _password = req.body.password;
	var _nick_name = req.body.nick_name;
	
	userModel.findOne({email: _email},function(err,data){
		if(err){
			console.error(err);
			if(res!=null){
				res.writeHead(500, {'Content-Type' : 'text/plain'});
				res.end('Internal server error');
			}
			return ;
		}
		else {
			
			var usr= toUser(req.body);
			
			if(!data){
				
				console.log('cannot find email ' + _email + ',will create new');
				
				usr.save(function(err){
					
					if(!err){
						usr.save();
					}
				});
				
				if(res!=null){
					res.writeHead(201, {'Content-Type' : 'text/plain'});
					res.end('Created');
				}
				return ;
			}
			
			
			
		}
		
		
		data.email= _email;
		data.password= _password;
		data.nick_name = _nick_name;
		data.save(function(err){
			if(!err){
				
				console.log('update sucess');
				data.save();
			}	
			else{
				console.log(err);
			}
		});
		
		if(res!=null){
			res.send('update success');
		}
		
		
	});
	
};



function toUser(body){
	
	return new userModel({
		email:body.email,
		password:body.password,
		nick_name:body.nick_name
	});
}

exports.remove = function(req,res)
{
	var _email = req.params.email;
	
	console.log('Deleting user with email: ' + _email);
	
	userModel.findOne({email: _email},function(err, data) 
	{
		if (err) 
		{
			console.error(err);
			if (res != null) {
				res.writeHead(500, {'Content-Type' : 'text/plain'});
				res.end('Internal server error');
			}
			return;
		}
				
		else
		{
					
			if (!data) 
			{
				console.log('not found');
				if (res != null) 
				{
					res.writeHead(404,{'Content-Type' : 'text/plain'});
					res.end('Not Found');
				}
				return;
			}
			else
			{
						
				data.remove(function(error){
				if (!error) {
					data.remove();
				}
				else 
				{
					console.log(error);
				}
				});
			}
			
			if (res != null){
				 res.send('Deleted');
				 }
			return;
			
		}
					
			
		
						
	});
	
	
};

exports.findone = function(req,res){
	
	var email = req.params.email;
	
	userModel.find({email:email}, function(error,
			result) {
			 if (error) {
			 console.error(error);
			 }
			 else {
			   
				 var json = JSON.stringify(result);
					
				console.log('the query-result is :',json);
				res.setHeader('content-type','application/json');
				res.end(json);
			 }
			});
	
	
};



exports.updateImage = function(req,res){
	var _email =req.params.email;
	console.log('Update image for user email:' + _email);
	req.pipe(gfs.createWriteStream({
		_id : _email,
		filename : 'image',
		mode : 'w'
	}));
	res.send('successfully uploaded image for email:' + _email);
};

exports.getImage = function(req,res){
	var _email = req.params.email;
	console.log('requesting image for email:' + _email);
	
	var imageStream = gfs.createReadStream({
		_id : _email , 
		filename : 'image',
		mode : 'r'
	});
	
	imageStream.on('error',function(err){
		response.send('404','Not found');
		return ;
	});
	
	response.setHeader('Content/Type','image/jpeg');
	imageStream.pipe(res);
};


exports.deleteImage = function(req,res){
	var _email = req.parames.email;
	console.log('Delete image for email : '+ _email);
	
	var collection = mongodb.collection('fs.files');
	collection.remove({_id:_email,filename:'image'},function(err,data){
		if(err){
			console.log(err);
			return ;
		}
		if(data==null){
			res.send('404','Not found');
			return ;
		}
		else{
			console.log('Successfully deleted image for email'+ _email);
			
		}
		
		
	});
	
	res.send('Successfully deleted imag for email' + _email);
};


/*
var user = new userModel({
	 email: "alvin@gmail.com",
	 nick_name: "alvin"
	});
	var db = mongoose.connection;
	
	mongoose.connect('mongodb://localhost/contacts');
	usr.save(function(error){
	 if (error) {
	 console.log('Error while saving contact for alvin');
	 console.log(error);
	 }
	 else {
		 usr.save();
	console.log('Contact for alvin has been successfully stored');
	 }
	});
	
	
	
	user.find({nick_name:'alvin'}, function(error,
			result) {
			 if (error) {
			 console.error(error);
			 }
			 else {
			   
				 var json = JSON.stringify(result);
					
				console.log('the query-result is :',json);
				 //console.dir(result);
			 }
			});

*/

