var Todo = require('./models/todo');
//const basicAuth = require('basic-auth');
var username = require('username');
var jwt = require('jsonwebtoken');
var userService = require('../services/user.service');

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/todos',verifyToken , function(req, res) {
		
		// use mongoose to get all todos in the database
		Todo.find({
			 userDb : req.result.sub}, function(err, todos) {
			
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
		});
	});

	// create todo and send back all todos after creation
	app.post('/api/todos',verifyToken, function(req, res) {
		console.log("----------------estou aqui------------");

		Todo.create({
			userDb : req.result.sub,
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find({
				userDb : req.result.sub},function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});

	});

	// delete a todo
	app.delete('/api/todos/:todo_id',verifyToken  ,function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find({userDb : req.result.sub},function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});

	// application -------------------------------------------------------------
	/*app.get('*', function(req, res) {
		res.sendfile('/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});*/


	function verifyToken(req, res, next) {
		//get auth header value
		const bearerHeader = req.headers['authorization'];
		//check if bearer id undefine
		if (typeof bearerHeader !== 'undefined') {
			console.log(req.headers)
			//split at the space
			const bearer = bearerHeader.split(' ')
			//get token from array
			const bearerToken = bearer[1];
			//set the token
	
			req.token = bearerToken;

		

			jwt.verify(bearerToken,"lS14MmXF3NL3Rchdm2abOCJYDbz81X9s2fVo1dsz8V8accZmTwSyTL0KZ0ujSQVszBy8t3BUzoafEnq6hCEPCZNRLt7yDtDtHtoS",(err, result)=>{
			
					if (err) {
						res.sendStatus(403);
					} else {
						req.result = result;
							next();
					}
			})
			
			
		} else {
			res.sendStatus(403);
			
	
		
		}

		
	}
	
};

