var express = require('express'),
    app = express(),
    sockets = require('socket.io'),
    port = 3700;
var io = sockets.listen( app.listen( port ) );

var mongoose = require('mongoose');
var database = "angulartestdb";
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

var items = mongoose.model('Todos', schema ); 

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
