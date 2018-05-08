var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var urlencodedParser = bodyParser.urlencoded({extended: false});

//var data = [{item: 'get mail'}, {item: 'walk dog'}, {item: 'start coding'}];

//coonect to database

mongoose.connect('mongodb://127.0.0.1:27017/todo-nodeapp');

//create a schema - a blueprint of database
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

// var itemOne = Todo({item: 'wake up early'}).save(function(err){
//     if(err) throw err;

//     console.log('Item saved');
// });


module.exports = function(app){
    app.get('/todo', function(req, res){
        //get data from mongoDB and pass it to the view
        Todo.find({}, function(err, data){
            if(err) throw err;
            res.render('todo', {todos: data});        
        });
    });

    app.post('/todo', urlencodedParser, function(req, res){
        //get data from theview and add it to the database
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err;
            console.log('Item saved');
            res.json(data);
        })               
    });
    
    app.delete('/todo/:item', function(req, res){
        // delete the requesteditem from the database
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if(err) throw err;

            console.log('Item deleted');
            res.json(data);
        });
    });

};
