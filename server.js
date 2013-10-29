var express = require('express'),
    app = express(),
    sockets = require('socket.io'),
    port = 3700;
var io = sockets.listen( app.listen( port ) );

//console.log( foundation );
console.log( 'Listening on port: ' + port );

/* Configuration */
app.use(express.static(__dirname + '/public'));


/* Routes: just one page for now */
app.get('/', function( req, res ){
    res.sendfile('index.html');
});
app.get('/tic', function( req, res ){
    res.sendfile('tictactoe.html');
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
