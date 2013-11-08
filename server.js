"use_strict";

var express = require('express'),
    app = express(),
    sockets = require('socket.io'),
    port = 3700;
var io = sockets.listen( app.listen( port ) );

var mongoose = require('mongoose');
var database = "todo-app";

mongoose.connect('mongodb://localhost/' + database, function(err){
    if( err ){
        console.log( 'Error connection to database: ' + database );
    } else {
        console.log( 'Connected to ' + database ); 
    }
});

var schema = mongoose.Schema({

    name : { type : String },
    date : { type : Date, default : Date.now }

});

var todoSchema = mongoose.Schema({
    id : { type : number },
    todoText : { type : String },
    dateAdded : { type : Date, Default : Date.now },
    dateCompleted : { type : Date }
});
var Todo = mongoose.model('Todos', todoSchema );

io.sockets.on('connection', function(socket){
    var query = Todo.find({});
    query.exec(function(err, todos){
        socket.emit('load_todos', todos );
    });

    socket.on('add_todo', function(data){
        var new_todo = new Todo( data );
        new_todo.save();
    })
    socket.on('remove_todo', function(data){
        var object = {id:data.id};
        var query = Todo.remove( object );
        query.exec(function(err, todos){
            // socket.emit('load_todos', todos );
            console.log( "error: " + err );
            // console.log( "error: " + err );
        });
        // var new_todo = new Todo( data );
        // new_todo.save();
    })
});

// var chatSchema = mongoose.Schema({
//     nick: String,
//     msg: String,
//     created: {type: Date, default: Date.now}
// });



//console.log( foundation );
console.log( 'Listening on port: ' + port );

/* Configuration */
app.use(express.static(__dirname + '/public'));


/* Routes */
app.get('/', function( req, res ){
    res.sendfile('index.html');
});
app.get('/tic', function( req, res ){
    res.sendfile('tictactoe.html');
});
app.get('/angular', function( req, res ){
    res.sendfile('angular_stuff.html');
});
app.get('/todo', function( req, res ){
    res.sendfile('todo.html');
});



//io.sockets.on('connection', function (socket) {
io.sockets.on('connection', function(socket){
    
    // Simple welcome message
    socket.emit( 'welcome', { "message": "Welcome New Developer!" } );
    
    
    socket.on( 'send', function(data){
        // data here, how do I emit it to other sockets $scope
        socket.broadcast.emit('converse', data);
        
    });



    
    // Other functions for other actions... todo
    
    
    
})
