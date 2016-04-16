
var express = require('express')
 , http = require('http')
 , path = require('path')
 , bodyParser = require('body-parser')
 , logger = require('morgan')
 , methodOverride = require('method-override')
 , errorHandler = require('errorhandler')
 , mongoose = require('mongoose')
 , usr = require('./modules/mongodb/users')
 , auth = require('./modules/mongodb/auth')
 , routes = require('./routes')
 , multer = require('multer')
 , upload = multer();

var app = express();
var url = require('url');
var router = express.Router();

// all environments
app.set('port', process.env.PORT || 8888);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.static(path.join(__dirname, 'public')));

//middleware

router.use(function(req,res,next){
	
	console.log('middleware');
	auth.checkUser(req,res,next);
	next();
}
);

router.get('/',function(req,res){
	res.send('home page!');
});

router.get('/users',function(req,res){
	res.send('user page!');
});


app.use('/api',router);

app.route('/').get(routes.index);



//app.use('/api',auth.checkUser);

//驗証user




//app.get('/',function(req,res){	
	//res.sendfile("./views/index.html");
//});


/*  驗証機制
app.post('/login',function(req,res){
	var email = req.body.email;
	var password=req.body.password;
	res.send("yes");
});

*/


//app.get('/users',usr.list);

//app.get('/users',router.users);

app.get('/users/:email',usr.findone);


app.del('/users/:email',usr.remove);


app.put('/users',usr.create);


app.post('/users',usr.update);


app.del('/users/:email/image',usr.deleteImage);

app.get('/users/:email/image',usr.getImage);

app.post('/users/:email/image',usr.updateImage);

app.put('/users/:email/image',usr.updateImage);


//app.get('/', routes.index);
//app.get('/users', user.list);
/*
app.get('/contacts',
		function(request,response){
			
			var get_params = url.parse(request.url,true).query;
			
			if(Object.keys(get_params).length==0)
				{
					response.setHeader('content-type','application/json');
					response.end(JSON.stringify(contacts.list()));
				
				}
			else{
				
				response.setHeader('content-type','application/json');
				response.end(JSON.stringify(contacts.query_by_arg(get_params.arg,get_params.value)
						
				));
			}
	
});


app.get('/contacts/:number',function(request,response){
	response.setHeader('content-type','application/json');
	response.end(JSON.stringify(contacts.query(request.params.number)));
});

app.get('/groups',function(request,response){
	console.log('group');
	response.setHeader('content-type','application/json');
	response.end(JSON.stringify(contacts.list_groups())
			);
	
});


app.get('/groups/:name',cors(),function(request,response){
	
	console.log('group');
	response.setHeader('content-type','application/json');
	response.end(JSON.stringify(
			contacts.get_members(request.params.name)
	));
	
});

//app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


*/


http.createServer(app).listen(app.get('port'), function(){
  console.log('server listening on port ' + app.get('port'));
});
