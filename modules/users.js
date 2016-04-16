



var client = require('mariasql');

var c =new client({
	host:'127.0.0.1',
	user:'root',
	password:'admin',
	db:'nc'
	
});


exports.list = function(req, res){
	  //res.send("respond from users");
	  console.log("respond from USER");
	  
	  var query = "select * from USER";
	  var json ='';
	  
	  c.query(query ,null,{metadate:true},function(err,rows){
			
			if(err)
				throw err;

			
			//console.dir(rows);
			
			json = JSON.stringify(rows);
			
			console.log('the query-result is :',json);
			
			res.setHeader('content-type','application/json');
			res.end(json);
		});


		c.end();
	  
	  
	  
	};

	
	exports.get_one = function(req,res){
		console.log('get user by email :' + req.params.email);
		
		var email = req.params.email;
		var sql = "SELECT * FROM  USER WHERE EMAIL=:email";
		
		c.query(sql,{email:req.params.email},function(err,rows){
		
			if(err){
				//throw err;
				console.error(err.stack);
				res.status(500).send('Something broke!');
			}
			
			if(rows.length==0){				
				
				res.status(404).send('查無資料！');
			}
			
			var json = JSON.stringify(rows);
			
			console.log('the query-result is :',json);
			
			res.setHeader('content-type','application/json');
			res.end(json);
		});
		
		c.end();
		//res.send('get user by key');
	};

exports.create = function(req,res){
	
	var exec = "insert into USER(email,nick_name) values(:email,:nick_name)";
	
	c.query(exec ,{email:req.body.email,nick_name:req.body.nick_name},function(err,rows){
		
		if(err){
			//throw err;
			console.error(err.stack);
			res.status(500).send('Something broke!');
		}
		
				
	
		res.end('新增成功');
		c.end();
	});
	
	//console.log(req.body);
	//console.log(res.json(req.body));
	//var json = JSON.stringify(req.body);
	//res.end(req.body.email);
	
	
	};	

exports.update = function(req,res){
	//res.send("update user");
	
	var exec = "UPDATE USER SET NICK_NAME=:NICK_NAME WHERE EMAIL=:EMAIL";
	
	c.query(exec ,{email:req.body.email,nick_name:req.body.nick_name},function(err,rows){
		
		if(err){
			//throw err;
			console.error(err.stack);
			res.status(500).send('Something broke!');
		}
		
				
	
		res.end('更新成功');
		c.end();
	});
	
	
	
};
	
exports.remove = function(req,res){
	
	//res.send('delete user by email:' + req.params.email);
	//console.log('delete user by email' + req.params.email);
	
	var exec = "delete FROM USER where EMAIL=:email ";
	
	c.query(exec,{email:req.params.email},function(err,rows){
		if(err){
			//throw err;
			console.error(err.stack);
			res.status(500).send(err.stack);
		}
			
		console.log('delete user by email' + req.params.email + ' success!');
		res.send('ok!');
	});
	
};





