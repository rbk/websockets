var app = angular.module('todoApp', []);

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

app.controller('TodoCtrl', function( $scope, socket ){
	
	$scope.todos;

	socket.on('load_todos', function( data ){
		$scope.todos = data;
	})

	$scope.addTodo = function(){
		var data = { 
				// '_id' : '',
				'todoText' : $scope.todoText, 
				'dateAdded' : new Date(), 
				'dateCompleted' : '' 
		};
		$scope.todoText = '';
		// $scope.todos.push(data);
		socket.emit('add_todo', data);
		// console.log( "Sending data to server..." );
	}
	$scope.removeTodo = function(index){
		var data = $scope.todos[index]._id;
		if( !data ){
			console.log( "Index empty" )
            return false;
		}
		$scope.todos.splice(index,1);
		socket.emit('remove_todo', data );

	}

});
