var express = require('express');
var app = express();
var mongoose = require('mongoose');
// log request to the console (express4)
var morgan = require('morgan');
// pull information from HTML POST (express4)
var bodyParser = require('body-parser');
// simulate DELETE and PUT (express4)
var methodOverride = require('method-override');

mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json' }));
app.use(methodOverride());

// define model
var Todo = mongoose.model('Todo', {text: String});

// routes
app.get('/api/todos', function(req, res){
  // use mongoose to get all the todos from the db
  Todo.find(function(err, todos){
    if (err) res.send(err);

    res.json(todos);
  });
});

// create todo and send back all todos after creation
app.post('/api/todos', function(req, res){
  // create a todo, information comes from AJAX request from Angular
  Todo.create({
    text: req.body.text,
    done: false
  }, function(err, todo){
    if (err) res.send(err);

    // get and return all the todos after you create
    Todo.find(function(err, todos){
      if (err) res.send(err);

      res.json(todos);
    });
  });
});

// delete a todo
app.delete('/api/todos/:todo_id', function(req, res){
  Todo.remove({
    _id: req.params.todo_id
  }, function(err, todo){
    if (err) res.send(err);

    // get and return all the todos after you create another
    Todo.find(function(err, todos){
      if (err) res.send(err);

      res.json(todos);
    });
  });
});

// angular route
app.get('*', function(req, res){
  res.sendfile('./public/index.html');
});

app.listen(8080);
console.log('App listening on port 8080');
