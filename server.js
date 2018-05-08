var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

//setup template
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controller
todoController(app);

//lsiten to port
app.listen(3000, function(){
    console.log('Listening to port 3000');
});