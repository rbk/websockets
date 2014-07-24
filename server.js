"use_strict";

var express = require('express'),
    app = express(),
    sockets = require('socket.io'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    port = 3700;

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (!user.verifyPassword(password)) { return done(null, false); }
//       return done(null, user);
//     });
//   }
// ));
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

var userSchema = mongoose.Schema({
    emailAddress : { type : String, unique : true },
    userName : { type : String },
    password : { type : String }

});
var Users = mongoose.model('users', userSchema);

// app.post('/login',
//   passport.authenticate('local', { successRedirect: '/',
//                                    failureRedirect: '/',
//                                    failureFlash: true })
// );
// app.post('/signup', passport)

var todoSchema = mongoose.Schema({
    userName : { type : String },
    todoText : { type : String },
    dateAdded : { type : Date, Default : Date.now },
    dateCompleted : { type : Date }
});
var Todo = mongoose.model('Todos', todoSchema );




io.sockets.on('connection', function(socket){
    
    socket.on('set username', function( name ){
          socket.set('userName', name, function(){
                console.log( "--- User: " + name + " joined.") 
          });
    });
    
    var query = Todo.find();
    query.exec(function(err, todos){
        socket.emit('load_todos', todos );
    });

    socket.on('add_todo', function(data){
        var new_todo = new Todo( data );
        new_todo.save(function(err){
            if( err ){
                console.log( 'error saving' );
            } else {
                var query = Todo.find({});
                query.exec(function(err, todos){
                    socket.emit('load_todos', todos );
                    socket.broadcast.emit('load_todos', todos );
                });
            }
        });
    });
    socket.on('remove_todo', function(data){
        var object = {_id:data};
        var query = Todo.remove( object );
        query.exec(function(err, todos){
            // console.log( "error: " + err );
            if( todos == 1 ){
                var query = Todo.find();
                query.exec(function(err, todos){
                    socket.broadcast.emit('load_todos', todos );
                });
            }
        });
        // var new_todo = new Todo( data );
        // new_todo.save();
    });
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
app.get('/login', function( req, res ){
    res.sendfile('login.html');
});
app.get('/signup', function( req, res ){
    res.sendfile('signup.html');
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
