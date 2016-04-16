
/**
 * Module dependencies.
 */

var express = require('express')
	,cors =require('cors')
	,http = require('http')
	,path = require('path')
	,contacts =require('./modules/contacts')
	,usr = require('./modules/users')
	,bodyparser = require('body-parser')
	,multer = require('multer')
	,upload = multer();

var url =require('url');
var app = express();

// all environments
app.set('port', process.env.PORT || 8180);
//app.set('views', __dirname + '/views');
//app.set('view engine', 'jade');
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.bodyParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
//app.use(express.methodOverride());
//app.use(app.router);
/*
var admin = express();

admin.on('mount',function(parent){
	console.log('admin mounted');
	console.log(parent);
});

admin.get('/',function(req,res){
	res.send('admin homepage');
});

app.use('/admin',admin);
*/

app.get('/',function(req,res){
	
	res.sendfile("index.html");
});

app.post('/login',function(req,res){
	var email = req.body.email;
	var password=req.body.password;
	res.send("yes");
});

app.get('/users',usr.list);

app.get('/users/:email',usr.get_one);

//app.get('/user/:email',usr.get_user)

app.del('/users/:email',usr.remove);

app.post('/users', upload.array(),usr.create);

app.put('/users',usr.update);

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
  console.log('Express server listening on port ' + app.get('port'));
});
