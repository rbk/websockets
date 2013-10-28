var app = angular.module('chatApplication', []); // No dependencies, hence the empty array
var socket = io.connect('http://localhost');


// A factory is a service you can inject into a controller

// This would be good for building api's
app.factory('Data', function(){
	return { fname: "Richard", lname: "Keller", alpha: "abcdefghijklmnopqrstuvwxyz" };
});

app.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});


// Filters are awesome
app.filter('reverse', function(Data){
	return function( text ) {
		return text.split("").reverse().join("");
	}
})


// Learn tests later

function singleChat( $scope, socket ){
    
//    $scope.userName = prompt('Please enter your name:');
    $scope.userName = "Richard";
    $scope.messages = [{"name":"Bot", "content":"Welcome to the coolest place on the internet."}];
    
    $scope.sendMessage = function(){
        
        var board = document.getElementById('message_board'),
            message = document.forms['sendMessage'].elements['message'].value,
            object = {"name" : $scope.userName, "content" : message};
        
        document.forms['sendMessage'].elements['message'].focus();
        document.forms['sendMessage'].elements['message'].value = "";
        
        $scope.messages.push( object );
        socket.emit('send', object );
        
        board.scrollTop = board.scrollHeight;
    };
    socket.on( 'converse', function(data){
        $scope.messages.push(data); 
    });
    socket.on( 'connect', function(data){
        $scope.messages.push( {'name': 'Bot','content': $scope.userName + ' has entered the chat room.'} ) 
    });
}

socket.on('welcome', function( data ){
        console.log( data.message )
});